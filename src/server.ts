import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { z } from 'zod';
import cors from '@fastify/cors'

const app = fastify();

app.register(cors, { 
  origin: '*'
})

const prisma = new PrismaClient();

app.get('/guests', async () => {
  const guests = await prisma.guest.findMany();
  console.log(guests);

  return { guests };
});

app.post('/guests', async (request, reply) => {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    adults: z.number(),
    kidsUpTo6: z.number(),
    kidsOver6: z.number()
  });

  const { name, email, phone, adults, kidsUpTo6, kidsOver6 } = createUserSchema.parse(request.body);

  const guest = { name, email, phone, adults, kidsUpTo6, kidsOver6 };

  await prisma.guest.create({
    data: guest
  });

  return reply.status(201).send();
})

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333 
}).then(() => console.log('Server running'))
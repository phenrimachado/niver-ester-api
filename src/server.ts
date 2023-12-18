import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { z } from 'zod';
import cors from '@fastify/cors'

const app = fastify();

app.register(cors, { 
  origin: (origin, cb) => {
    if (origin) {
      cb(null, true);
      return;
    }
  }
})

const prisma = new PrismaClient();

app.get('/guests', async () => {
  const guests = await prisma.guest.findMany();

  return { guests };
});

app.post('/guests', async (request, reply) => {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string()
  });
  const { name, email, phone } = createUserSchema.parse(request.body);

  await prisma.guest.create({
    data: {
      name,
      email,
      phone
    }
  });

  return reply.status(201).send();
})

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333 
}).then(() => console.log('Server running'))
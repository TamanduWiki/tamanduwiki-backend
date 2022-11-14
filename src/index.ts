import express from 'express';

import { v4 as uuid } from 'uuid';

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();

app.use(express.json());

app.get("/users", async (request, response) => {
  const users = await prisma.user.findMany();

  return response.json(users);
});

app.post("/users", async (request, response) => {
  try {
    const { firstName, lastName, password, universityTie, email } = request.body;

    const user = {
      id: uuid(),
      firstName,
      lastName,
      password,
      universityTie,
      email,
    };

    await prisma.user.create({ data: user })

    return response.status(201).send();
  } catch (error) {
    return response.status(500).json("TA FAZENDO MERDA").send();
  }
});

//server
app.listen(3333);

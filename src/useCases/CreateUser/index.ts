import { PrismaUsersRepository } from "@/repositories/implementations/PrismaUsersRepository";

import { MailerSendEmailService } from "@/services/implementations/MailerSendEmailService";

import { SendAccountConfirmationEmailUseCase } from "../SendAccountConfirmationEmail/SendAccountConfirmationEmailUseCase";

import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const emailService = new MailerSendEmailService();

const prismaUsersRepository = new PrismaUsersRepository();

const createUserUseCase = new CreateUserUseCase(prismaUsersRepository);

const sendConfirmationEmailUseCase = new SendAccountConfirmationEmailUseCase(
  emailService
);

const createUserController = new CreateUserController(
  createUserUseCase,
  sendConfirmationEmailUseCase
);

export { createUserUseCase, createUserController };

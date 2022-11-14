import { PrismaUsersRepository } from "@/repositories/implementations/PrismaUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const prismaUsersRepository = new PrismaUsersRepository();

const createUserUseCase = new CreateUserUseCase(prismaUsersRepository);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };

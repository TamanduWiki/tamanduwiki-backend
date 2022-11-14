import { PrismaUsersRepository } from "@/repositories/implementations/PrismaUsersRepository";
import { GetUsersController } from "./GetUsersController";
import { GetUsersUseCase } from "./GetUsersUseCase";

const prismaUsersRepository = new PrismaUsersRepository();

const getUsersUseCase = new GetUsersUseCase(prismaUsersRepository);

const getUsersController = new GetUsersController(getUsersUseCase);

export { getUsersUseCase, getUsersController };

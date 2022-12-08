import { PrismaUsersRepository } from "@/repositories/implementations/PrismaUsersRepository";
import { ListUsersController } from "./ListUsersController";
import { ListUsersUseCase } from "./ListUsersUseCase";

const prismaUsersRepository = new PrismaUsersRepository();

const listUsersUseCase = new ListUsersUseCase(prismaUsersRepository);

const listUsersController = new ListUsersController(listUsersUseCase);

export { listUsersUseCase, listUsersController };

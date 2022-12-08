import { PrismaUsersRepository } from "@/repositories/implementations/PrismaUsersRepository";
import { LoginController } from "./LoginController";
import { LoginUseCase } from "./LoginUseCase";

const prismaUsersRepository = new PrismaUsersRepository();

const loginUseCase = new LoginUseCase(prismaUsersRepository);

const loginController = new LoginController(loginUseCase);

export { loginUseCase, loginController };

import { PrismaUsersRepository } from "@/repositories/implementations/PrismaUsersRepository";

import { ConfirmAccountController } from "./ConfirmAccountController";
import { ConfirmAccountUseCase } from "./ConfirmAccountUseCase";

const usersRepository = new PrismaUsersRepository();

const confirmAccountUseCase = new ConfirmAccountUseCase(usersRepository);

const confirmAccountController = new ConfirmAccountController(
  confirmAccountUseCase
);

export { confirmAccountUseCase, confirmAccountController };

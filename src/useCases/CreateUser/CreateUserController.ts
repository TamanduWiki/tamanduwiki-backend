import { Request, Response } from "express";
import { SendAccountConfirmationEmailUseCase } from "@/useCases/SendAccountConfirmationEmail/SendAccountConfirmationEmailUseCase";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private sendConfimationEmailUseCase: SendAccountConfirmationEmailUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { firstName, lastName, email, universityTie, password } =
      request.body;

    try {
      const createdUser = await this.createUserUseCase.execute({
        firstName,
        lastName,
        email,
        password,
        universityTie,
      });

      await this.sendConfimationEmailUseCase.execute(createdUser);

      return response.status(201).json(createdUser);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || "Unexpected Error.",
      });
    }
  }
}

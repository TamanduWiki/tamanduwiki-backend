import { Request, Response } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor (private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { firstName, lastName, email, universityTie, password } = request.body;

    try {
      await this.createUserUseCase.execute({
        firstName,
        lastName,
        email,
        password,
        universityTie,
      })

      return response.status(201).send();
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected Error.',
      })
    }
  }
}

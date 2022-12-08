import { Request, Response } from "express";

import { LoginUseCase } from "./LoginUseCase";

export class LoginController {
  constructor (private loginUseCase: LoginUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const loginData = await this.loginUseCase.execute({
        email,
        password,
      })

      return response.status(201).json(loginData);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected Error.',
      })
    }
  }
}

import { Request, Response } from "express";

import { ConfirmAccountUseCase } from "./ConfirmAccountUseCase";

export class ConfirmAccountController {
  constructor(private confirmAccountUseCase: ConfirmAccountUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;

    try {
      await this.confirmAccountUseCase.execute(token as string);

      return response
        .status(201)
        .json({ message: "E-mail/conta confirmados com sucesso!" });
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || "Unexpected Error.",
      });
    }
  }
}

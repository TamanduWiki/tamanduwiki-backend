import { Request, Response } from "express";

import { SendAccountConfirmationEmailUseCase } from "./SendAccountConfirmationEmailUseCase";

export class SendAccountConfirmationEmailController {
  constructor(
    private sendAccountConfirmationEmailUseCase: SendAccountConfirmationEmailUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request.body;

    try {
      await this.sendAccountConfirmationEmailUseCase.execute(user);

      return response
        .status(200)
        .json({ message: "E-mail enviado com sucesso!" });
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || "Unexpected Error.",
      });
    }
  }
}

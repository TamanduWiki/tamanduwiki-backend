import { Request, Response } from "express";

import { DeletePageUseCase } from "./DeletePageUseCase";

export class DeletePageController {
  constructor (private deletePageUseCase: DeletePageUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      await this.deletePageUseCase.execute(id)

      return response.status(200).send();
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected Error.',
      })
    }
  }
}

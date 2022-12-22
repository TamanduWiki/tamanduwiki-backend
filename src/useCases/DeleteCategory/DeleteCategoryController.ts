import { Request, Response } from "express";

import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

export class DeleteCategoryController {
  constructor (private deleteCategoryUseCase: DeleteCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      await this.deleteCategoryUseCase.execute(id)

      return response.status(200).send();
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected Error.',
      })
    }
  }
}

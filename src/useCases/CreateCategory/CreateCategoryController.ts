import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  constructor (private createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;

    try {
      const createdCategory = await this.createCategoryUseCase.execute({
        title,
      })

      return response.status(201).json(createdCategory);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected Error.',
      })
    }
  }
}

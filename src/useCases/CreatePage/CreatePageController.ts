import { Request, Response } from "express";

import { CreatePageUseCase } from "./CreatePageUseCase";

export class CreatePageController {
  constructor (private createPageUseCase: CreatePageUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { title, content, slug } = request.body;

    try {
      await this.createPageUseCase.execute({
        title,
        content,
        slug,
      })

      return response.status(201).send();
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected Error.',
      })
    }
  }
}

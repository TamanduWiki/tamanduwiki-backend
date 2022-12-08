import { Request, Response } from "express";

import { CreatePageUseCase } from "./CreatePageUseCase";

export class CreatePageController {
  constructor (private createPageUseCase: CreatePageUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { title, content, slug, imageBase64, imageFileType } = request.body;

    try {
      const createdPage = await this.createPageUseCase.execute({
        title,
        content,
        slug,
        imageBase64,
        imageFileType
      })

      return response.status(201).json(createdPage);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected Error.',
      })
    }
  }
}

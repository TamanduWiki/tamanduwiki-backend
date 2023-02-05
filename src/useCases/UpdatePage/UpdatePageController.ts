import { Request, Response } from "express";

import { UpdatePageUseCase } from "./UpdatePageUseCase";

export class UpdatePageController {
  constructor (private updatePageUseCase: UpdatePageUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { title, content, imageBase64, imageFileType, categoriesTitles } = request.body;
    const { id } = request.params;

    try {
      const updatedPage = await this.updatePageUseCase.execute(id, {
        categoriesTitles,
        title,
        content,
        imageBase64,
        imageFileType
      })

      return response.status(201).json(updatedPage);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected Error.',
      })
    }
  }
}

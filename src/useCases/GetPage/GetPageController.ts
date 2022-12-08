import { Request, Response } from "express";

import { GetPageUseCase } from "./GetPageUseCase";

export class GetPageController {
  constructor (private getPageUseCase: GetPageUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { slug } = request.params;

    try {
      const page = await this.getPageUseCase.execute(slug);

      return response.status(200).json(page);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected Error.',
      })
    }
  }
}

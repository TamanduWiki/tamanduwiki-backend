export interface IGetPagesRequestDTO {}
import { Request, Response } from "express";

import { GetPagesUseCase } from "./GetPagesUseCase";

export class GetPagesController {
  constructor (private getPagesUseCase: GetPagesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const pages = await this.getPagesUseCase.execute();

      return response.status(200).json(pages).send();
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected Error.',
      })
    }
  }
}

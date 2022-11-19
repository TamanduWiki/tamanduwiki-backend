export interface IGetPagesRequestDTO {}
import { Request, Response } from "express";

import { GetPagesUseCase } from "./GetPagesUseCase";

export class GetPagesController {
  constructor (private getPagesUseCase: GetPagesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { searchFor } = request.query;

      if (!['string', 'undefined'].includes(typeof searchFor)) {
        return response.status(400).json({
          message: "Invalid query param 'searchFor'. Use a 'string' or undefined",
        });
      }

      const pages = await this.getPagesUseCase.execute(searchFor as string | undefined);

      return response.status(200).json(pages);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected Error.',
      });
    }
  }
}

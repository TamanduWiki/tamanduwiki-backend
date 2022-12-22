import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController {
  constructor (private listCategoriesUseCase: ListCategoriesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { searchFor, page, per } = request.query;

      if (!['string', 'undefined'].includes(typeof searchFor)) {
        return response.status(400).json({
          message: "Invalid query param 'searchFor'. Use a 'string' or undefined",
        });
      }

      const pages = await this.listCategoriesUseCase.execute(
        searchFor as string | undefined,
        page ? Number(page) : 1,
        per ? Number(per) : 10,
      );

      return response.status(200).json(pages);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected Error.',
      });
    }
  }
}

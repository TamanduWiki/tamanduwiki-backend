export interface IGetUsersRequestDTO {}
import { Request, Response } from "express";

import { GetUsersUseCase } from "./GetUsersUseCase";

export class GetUsersController {
  constructor (private getUsersUseCase: GetUsersUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const users = await this.getUsersUseCase.execute();

      return response.status(200).json(users);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected Error.',
      })
    }
  }
}

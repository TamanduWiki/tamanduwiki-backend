export interface IListUsersRequestDTO {}
import { Request, Response } from "express";

import { ListUsersUseCase } from "./ListUsersUseCase";

export class ListUsersController {
  constructor (private getUsersUseCase: ListUsersUseCase) {}

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

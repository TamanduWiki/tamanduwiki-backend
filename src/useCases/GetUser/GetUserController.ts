import { Request, Response } from "express";

export class GetUserController {
  constructor () {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const user = request.user;

      if (user) {
        const {
          id,
          firstName,
          lastName,
          email,
          status,
          universityTie,
          createdAt,
          updatedAt,
        } = user;

        return response.status(200).json({
          id,
          firstName,
          lastName,
          email,
          status,
          universityTie,
          createdAt,
          updatedAt,
        });
      }

      return response.status(200).json({});
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected Error.',
      })
    }
  }
}

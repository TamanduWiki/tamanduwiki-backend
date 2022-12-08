import { User } from "@/entities/User";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authenticateUser = (request: Request, response: Response, next: NextFunction) => {
  try {
    const token = request.headers['authorization'];

    if (!token) {
      return response.status(401).json({
        auth: false,
        message: 'Nenhum token providenciado.',
      });
    }

    jwt.verify(token as string, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        return response.status(500).json({
          auth: false,
          message: err?.message || 'Houve uma falha no sistema de autenticação.',
        });
      }

      request.user = decoded as Omit<User, 'password'> & JwtPayload;

      next();
    });
  } catch(err) {
    return response.status(500).json({
      auth: false,
      message: 'Houve uma falha no sistema de autenticação.',
    });
  }
}

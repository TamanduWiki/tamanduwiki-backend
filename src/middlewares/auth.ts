import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";

import { User } from "@/entities/User";

export const authenticateUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = request.headers["authorization"];

    if (!token) {
      return response.status(401).json({
        auth: false,
        error: "auth-no-token-error",
        message: "Nenhum token providenciado.",
      });
    }

    jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (err, decoded) => {
        if (err) throw err;

        request.user = decoded as Omit<User, "password"> & JwtPayload;
      }
    );

    if (!request.user) {
      return response.status(500).json({
        auth: false,
        error: "auth-jwt-decoded-no-user",
        message: "Houve uma falha no sistema de autenticação.",
      });
    }

    if (request.user.status === "banned") {
      return response.status(500).json({
        auth: false,
        error: "auth-jwt-decoded-user-banned",
        message: "Usuário banido.",
      });
    }

    if (request.user.status === "suspended") {
      return response.status(500).json({
        auth: false,
        error: "auth-jwt-decoded-user-suspensed",
        message: "Usuário suspenso.",
      });
    }

    if (request.user.status === "pending_auth") {
      return response.status(500).json({
        auth: false,
        error: "auth-jwt-decoded-pending-auth",
        message: "Usuário ainda não confirmou o e-mail.",
      });
    }

    next();
  } catch (err: any) {
    if (err instanceof JsonWebTokenError) {
      return response.status(500).json({
        auth: false,
        error: "auth-invalid-or-expired-token-error",
        message: err?.message || "Houve uma falha no sistema de autenticação.",
      });
    }

    return response.status(500).json({
      auth: false,
      error: "auth-unexpected-error",
      message: err?.message || "Houve uma falha no sistema de autenticação.",
    });
  }
};

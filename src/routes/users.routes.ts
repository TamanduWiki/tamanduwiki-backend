import { Router } from "express";

import { authenticateUser } from "@/middlewares/auth";

import { createUserController } from "@/useCases/CreateUser";
import { listUsersController } from "@/useCases/ListUsers";
import { loginController } from "@/useCases/Login";
import { getUserController } from "@/useCases/GetUser";

const router = Router();

router.post("/users", (request, response) => {
  return createUserController.handle(request, response);
});

router.get("/users", authenticateUser, (request, response) => {
  return listUsersController.handle(request, response);
});

router.get("/user-info", authenticateUser, (request, response) => {
  return getUserController.handle(request, response);
});

// Auth

router.post("/login", (request, response) => {
  return loginController.handle(request, response);
});

router.get("/ensure-authenticated", authenticateUser, (request, response) => {
  return response.status(200).json({ auth: true });
});

export { router };

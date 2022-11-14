import { Router } from "express";
import { router as usersRoutes } from "./users.routes";

const mainRoutes = Router();

mainRoutes.use(usersRoutes);

export { mainRoutes };

import { Router } from "express";
import { router as usersRoutes } from "./users.routes";
import { router as pagesRoutes } from "./pages.routes";

const mainRoutes = Router();

mainRoutes.use(usersRoutes);
mainRoutes.use(pagesRoutes);

export { mainRoutes };

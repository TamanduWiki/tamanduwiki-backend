import { Router } from "express";
import { router as categoriesRoutes } from "./categories.routes";
import { router as usersRoutes } from "./users.routes";
import { router as pagesRoutes } from "./pages.routes";

const mainRoutes = Router();

mainRoutes.use(usersRoutes);
mainRoutes.use(pagesRoutes);
mainRoutes.use(categoriesRoutes);

export { mainRoutes };

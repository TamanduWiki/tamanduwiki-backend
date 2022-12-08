import { Router } from "express";

import { authenticateUser } from "@/middlewares/auth";

import { createPageController } from "@/useCases/CreatePage";
import { listPagesController } from "@/useCases/ListPages";
import { deletePageController } from "@/useCases/DeletePage";
import { getPageController } from "@/useCases/GetPage";

const router = Router();

router.get('/pages', (request, response) => {
  return listPagesController.handle(request, response);
})

router.get('/pages/:slug', (request, response) => {
  return getPageController.handle(request, response);
})

router.post('/pages', authenticateUser, (request, response) => {
  return createPageController.handle(request, response);
});

router.delete('/pages/:id', authenticateUser, (request, response) => {
  return deletePageController.handle(request, response);
})

export { router };

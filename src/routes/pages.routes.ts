import { Router } from "express";

import { createPageController } from "@/useCases/CreatePage";
import { listPagesController } from "@/useCases/ListPages";
import { deletePageController } from "@/useCases/DeletePage";
import { getPageController } from "@/useCases/GetPage";

const router = Router();

router.get('/pages', (request, response) => {
  return listPagesController.handle(request, response);
})

router.get('/pages/:id', (request, response) => {
  return getPageController.handle(request, response);
})

router.post('/pages', (request, response) => {
  return createPageController.handle(request, response);
});

router.delete('/pages/:id', (request, response) => {
  return deletePageController.handle(request, response);
})

export { router };

import { Router } from "express";

import { createPageController } from "@/useCases/CreatePage";
import { getPagesController } from "@/useCases/GetPages";

const router = Router();

router.post('/pages', (request, response) => {
  return createPageController.handle(request, response);
});

router.get('/pages', (request, response) => {
  return getPagesController.handle(request, response);
})

export { router };

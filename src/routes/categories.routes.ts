import { Router } from "express";

import { authenticateUser } from "@/middlewares/auth";

import { createCategoryController } from "@/useCases/CreateCategory";
import { listCategoriesController } from "@/useCases/ListCategories";
import { deleteCategoryController } from "@/useCases/DeleteCategory";

const router = Router();

router.get('/categories', (request, response) => {
  return listCategoriesController.handle(request, response);
})

router.post('/categories', authenticateUser, (request, response) => {
  return createCategoryController.handle(request, response);
});

router.delete('/categories/:id', authenticateUser, (request, response) => {
  return deleteCategoryController.handle(request, response);
})

export { router };

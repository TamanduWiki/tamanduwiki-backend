import { PrismaCategoriesRepository } from "@/repositories/implementations/PrismaCategoriesRepository";

import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const prismaCategoriesRepository = new PrismaCategoriesRepository();

const createCategoryUseCase = new CreateCategoryUseCase(prismaCategoriesRepository);

const createCategoryController = new CreateCategoryController(createCategoryUseCase);

export { createCategoryUseCase, createCategoryController };

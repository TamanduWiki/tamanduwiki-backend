import { PrismaCategoriesRepository } from "@/repositories/implementations/PrismaCategoriesRepository";
import { DeleteCategoryController } from "./DeleteCategoryController";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

const prismaCategoriesRepository = new PrismaCategoriesRepository();

const deleteCategoryUseCase = new DeleteCategoryUseCase(prismaCategoriesRepository);

const deleteCategoryController = new DeleteCategoryController(deleteCategoryUseCase);

export { deleteCategoryUseCase, deleteCategoryController };

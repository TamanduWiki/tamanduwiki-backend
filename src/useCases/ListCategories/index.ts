import { PrismaCategoriesRepository } from "@/repositories/implementations/PrismaCategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const prismaCategoriesRepository = new PrismaCategoriesRepository();

const listCategoriesUseCase = new ListCategoriesUseCase(prismaCategoriesRepository);

const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

export { listCategoriesUseCase, listCategoriesController };

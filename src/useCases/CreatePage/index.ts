import { PrismaPagesRepository } from "@/repositories/implementations/PrismaPagesRepository";
import { CreatePageController } from "./CreatePageController";
import { CreatePageUseCase } from "./CreatePageUseCase";

const prismaPagesRepository = new PrismaPagesRepository();

const createPageUseCase = new CreatePageUseCase(prismaPagesRepository);

const createPageController = new CreatePageController(createPageUseCase);

export { createPageUseCase, createPageController };

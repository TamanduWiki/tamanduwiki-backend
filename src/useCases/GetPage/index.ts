import { PrismaPagesRepository } from "@/repositories/implementations/PrismaPagesRepository";

import { GetPageController } from "./GetPageController";
import { GetPageUseCase } from "./GetPageUseCase";

const prismaPagesRepository = new PrismaPagesRepository();

const getPageUseCase = new GetPageUseCase(prismaPagesRepository);

const getPageController = new GetPageController(getPageUseCase);

export { getPageUseCase, getPageController };

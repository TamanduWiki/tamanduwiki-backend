import { PrismaPagesRepository } from "@/repositories/implementations/PrismaPagesRepository";
import { DeletePageController } from "./DeletePageController";
import { DeletePageUseCase } from "./DeletePageUseCase";

const prismaPagesRepository = new PrismaPagesRepository();

const deletePageUseCase = new DeletePageUseCase(prismaPagesRepository);

const deletePageController = new DeletePageController(deletePageUseCase);

export { deletePageUseCase, deletePageController };

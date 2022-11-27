import { PrismaPagesRepository } from "@/repositories/implementations/PrismaPagesRepository";
import { ListPagesController } from "./ListPagesController";
import { ListPagesUseCase } from "./ListPagesUseCase";

const prismaPagesRepository = new PrismaPagesRepository();

const listPagesUseCase = new ListPagesUseCase(prismaPagesRepository);

const listPagesController = new ListPagesController(listPagesUseCase);

export { listPagesUseCase, listPagesController };

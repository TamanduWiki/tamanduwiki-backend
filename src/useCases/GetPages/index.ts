import { PrismaPagesRepository } from "@/repositories/implementations/PrismaPagesRepository";
import { GetPagesController } from "./GetPagesController";
import { GetPagesUseCase } from "./GetPagesUseCase";

const prismaPagesRepository = new PrismaPagesRepository();

const getPagesUseCase = new GetPagesUseCase(prismaPagesRepository);

const getPagesController = new GetPagesController(getPagesUseCase);

export { getPagesUseCase, getPagesController };

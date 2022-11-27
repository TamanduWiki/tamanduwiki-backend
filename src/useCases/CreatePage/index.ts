import { PrismaPagesRepository } from "@/repositories/implementations/PrismaPagesRepository";
import { SupabaseFilesRepository } from "@/repositories/implementations/SupabaseFilesRepository";

import { CreatePageController } from "./CreatePageController";
import { CreatePageUseCase } from "./CreatePageUseCase";

const prismaPagesRepository = new PrismaPagesRepository();
const supabaseFilesRepository = new SupabaseFilesRepository();

const createPageUseCase = new CreatePageUseCase(prismaPagesRepository, supabaseFilesRepository);

const createPageController = new CreatePageController(createPageUseCase);

export { createPageUseCase, createPageController };

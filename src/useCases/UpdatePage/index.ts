import { PrismaPagesRepository } from "@/repositories/implementations/PrismaPagesRepository";
import { SupabaseFilesRepository } from "@/repositories/implementations/SupabaseFilesRepository";

import { UpdatePageController } from "./UpdatePageController";
import { UpdatePageUseCase } from "./UpdatePageUseCase";

const prismaPagesRepository = new PrismaPagesRepository();
const supabaseFilesRepository = new SupabaseFilesRepository();

const updatePageUseCase = new UpdatePageUseCase(prismaPagesRepository, supabaseFilesRepository);

const updatePageController = new UpdatePageController(updatePageUseCase);

export { updatePageUseCase, updatePageController };

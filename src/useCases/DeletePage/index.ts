import { PrismaPagesRepository } from "@/repositories/implementations/PrismaPagesRepository";
import { SupabaseFilesRepository } from "@/repositories/implementations/SupabaseFilesRepository";
import { DeletePageController } from "./DeletePageController";
import { DeletePageUseCase } from "./DeletePageUseCase";

const supabaseFilesRepository = new SupabaseFilesRepository();

const prismaPagesRepository = new PrismaPagesRepository();

const deletePageUseCase = new DeletePageUseCase(prismaPagesRepository, supabaseFilesRepository);

const deletePageController = new DeletePageController(deletePageUseCase);

export { deletePageUseCase, deletePageController };

import { ICategoriesRepository } from "@/repositories/ICategoriesRepository";

export class DeleteCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(id: string) {
    const categoryExists = await this.categoriesRepository.findById(id);

    if (!categoryExists) {
      throw new Error('Categoria a ser deletada não existe.');
    }

    await this.categoriesRepository.delete(categoryExists.id);
  }
}

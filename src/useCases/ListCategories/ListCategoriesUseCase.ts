import { Category } from "@/entities/Category";
import { WithMetaProps } from "@/types/metaProps";

import { ICategoriesRepository } from "@/repositories/ICategoriesRepository";

export class ListCategoriesUseCase {
  constructor (private categoriesRepository: ICategoriesRepository) {}

  async execute(searchParam?: string, page?: number, per?: number): Promise<WithMetaProps<{ categories: Category[] }>> {
    const categoriesWithMeta = await this.categoriesRepository.findAllByTitle(
      searchParam || '',
      page,
      per,
    );

    return categoriesWithMeta;
  }
}

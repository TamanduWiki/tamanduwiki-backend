import { v4 as uuid } from 'uuid';

import { Category } from "@/entities/Category";

import { ICategoriesRepository } from "@/repositories/ICategoriesRepository";

import { ICreateCategoryRequestDTO } from "./CreateCategoryDTO";

export class CreateCategoryUseCase {
  constructor (private categoriesRepository: ICategoriesRepository) {}

  async execute(data: ICreateCategoryRequestDTO): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.findByTitle(data.title);

    if (categoryAlreadyExists) {
      throw new Error('Title already linked to an existing category.');
    }

    const category: Category = {
      id: uuid(),
      title: data.title,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await this.categoriesRepository.save(category);
  }
}

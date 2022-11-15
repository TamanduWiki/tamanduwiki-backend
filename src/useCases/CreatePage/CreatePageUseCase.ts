import { Page } from "@/entities/Page";
import { IPagesRepository } from "@/repositories/IPagesRepository";
import { ICreatePageRequestDTO } from "./CreatePageDTO";

export class CreatePageUseCase {
  constructor (private pagesRepository: IPagesRepository) {}

  async execute(data: ICreatePageRequestDTO) {
    const pageAlreadyExists = await this.pagesRepository.findBySlug(data.slug);

    if (pageAlreadyExists) {
      throw new Error('Slug already linked to an existing page.');
    }

    const page = new Page({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.pagesRepository.save(page);
  }
}

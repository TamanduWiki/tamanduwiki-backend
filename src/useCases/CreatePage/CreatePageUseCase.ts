import { v4 as uuid } from 'uuid';

import { Page } from "@/entities/Page";

import { IFilesRepository } from "@/repositories/IFilesRepository";
import { IPagesRepository } from "@/repositories/IPagesRepository";

import { ICreatePageRequestDTO } from "./CreatePageDTO";

export class CreatePageUseCase {
  constructor (private pagesRepository: IPagesRepository, private filesRepository: IFilesRepository) {}

  async execute(data: ICreatePageRequestDTO): Promise<Page> {
    const pageAlreadyExists = await this.pagesRepository.findBySlug(data.slug);

    if (pageAlreadyExists) {
      throw new Error('Slug already linked to an existing page.');
    }

    if (data.imageBase64 && !data.imageFileType) {
      throw new Error('Tipo de arquivo não foi enviado a API.');
    }

    const imageUrl = data.imageBase64
      ? await this.filesRepository.upload(data.imageBase64, 'page_main_imgs', data.imageFileType)
      : undefined;

    const page: Omit<Page, 'categories'> = {
      id: uuid(),
      content: data.content,
      slug: data.slug,
      title: data.title,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: imageUrl || null,
    };

    return await this.pagesRepository.save(page, data.categoriesTitles || []);
  }
}

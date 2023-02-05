import { Page } from "@/entities/Page";

import { IFilesRepository } from "@/repositories/IFilesRepository";
import { IPagesRepository } from "@/repositories/IPagesRepository";

import { IUpdatePageRequestDTO } from "./UpdatePageDTO";

export class UpdatePageUseCase {
  constructor (private pagesRepository: IPagesRepository, private filesRepository: IFilesRepository) {}

  async execute(id: string, data: IUpdatePageRequestDTO): Promise<Page> {
    const currentPage = await this.pagesRepository.findById(id);

    if (!currentPage) {
      throw new Error('Não existe página com esse identificador.');
    }

    let imageUrl = currentPage.imageUrl;

    const { imageFileType, imageBase64, categoriesTitles, ...rest } = data;

    if (imageBase64 && imageFileType && imageUrl) {
      await this.filesRepository.override(imageBase64, imageUrl, imageFileType);
    }

    return await this.pagesRepository.update(id, rest, categoriesTitles || []);
  }
}

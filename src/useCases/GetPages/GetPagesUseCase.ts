import { IPagesRepository } from "@/repositories/IPagesRepository";

export class GetPagesUseCase {
  constructor (private pagesRepository: IPagesRepository) {}

  async execute(searchParam?: string) {
    if (!!searchParam) {
      const pages = await this.pagesRepository.findAllByNameOrCategory(searchParam);

      return pages;
    }

    const pages = await this.pagesRepository.listAll();

    return pages;
  }
}

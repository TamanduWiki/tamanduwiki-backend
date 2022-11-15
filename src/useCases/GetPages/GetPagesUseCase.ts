import { IPagesRepository } from "@/repositories/IPagesRepository";

export class GetPagesUseCase {
  constructor (private pagesRepository: IPagesRepository) {}

  async execute() {
    const pages = await this.pagesRepository.listAll();

    return pages;
  }
}

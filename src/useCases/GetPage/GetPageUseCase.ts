import { Page } from "@/entities/Page";

import { IPagesRepository } from "@/repositories/IPagesRepository";

export class GetPageUseCase {
  constructor (private pagesRepository: IPagesRepository) {}

  async execute(id: string): Promise<Page>  {
    const page = await this.pagesRepository.findById(id);

    if (!page) {
      throw new Error('Página não existe.');
    }

    return page;
  }
}

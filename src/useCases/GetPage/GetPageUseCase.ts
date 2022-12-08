import { Page } from "@/entities/Page";

import { IPagesRepository } from "@/repositories/IPagesRepository";

export class GetPageUseCase {
  constructor (private pagesRepository: IPagesRepository) {}

  async execute(slug: string): Promise<Page>  {
    const page = await this.pagesRepository.findBySlug(slug);

    if (!page) {
      throw new Error('Página não existe.');
    }

    return page;
  }
}

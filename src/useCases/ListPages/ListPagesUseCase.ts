import { Page } from "@/entities/Page";
import { WithMetaProps } from "@/types/metaProps";

import { IPagesRepository } from "@/repositories/IPagesRepository";

export class ListPagesUseCase {
  constructor (private pagesRepository: IPagesRepository) {}

  async execute(searchParam?: string, page?: number, per?: number): Promise<WithMetaProps<{ pages: Page[] }>> {
    const pagesWithMeta = await this.pagesRepository.findAllByNameOrCategory(
      searchParam || '',
      page,
      per,
    );

    return pagesWithMeta;
  }
}

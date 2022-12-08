import { Page } from "@/entities/Page";

import { WithMetaProps } from "@/types/metaProps";

export interface IPagesRepository {
  // listAll: (page?: number, per?: number) => Promise<WithMetaProps<{ pages: Page[] }>>;
  findAllByNameOrCategory: (searchParam?: string, page?: number, per?: number) => Promise<WithMetaProps<{ pages: Page[] }>>;
  findById: (id: string) => Promise<Page | undefined>;
  findBySlug: (slug: string) => Promise<Page | undefined>;
  save: (page: Page) => Promise<Page>;
  delete: (id: string) => Promise<void>;
}

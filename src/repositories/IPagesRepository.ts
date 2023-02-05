import { Page } from "@/entities/Page";

import { WithMetaProps } from "@/types/metaProps";

export interface IPagesRepository {
  findAllByNameOrCategory: (searchParam?: string, page?: number, per?: number) => Promise<WithMetaProps<{ pages: Page[] }>>;
  findById: (id: string) => Promise<Page | undefined>;
  findBySlug: (slug: string) => Promise<Page | undefined>;
  save: (page: Omit<Page, 'categories'>, categoriesTitles: string[]) => Promise<Page>;
  delete: (id: string) => Promise<void>;
  update: (id: string, pageData: Partial<Omit<Page, "categories" | "id" | "slug">>, categoriesTitles: string[]) => Promise<Page>;
}

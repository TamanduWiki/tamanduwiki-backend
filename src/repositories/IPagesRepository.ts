import { Page } from "@/entities/Page";

export interface IPagesRepository {
  listAll: () => Promise<Page[]>;
  findAllByNameOrCategory: (searchParam: string) => Promise<Page[]>;
  findById: (id: string) => Promise<Page | undefined>;
  findBySlug: (slug: string) => Promise<Page | undefined>;
  save: (page: Page) => Promise<void>;
}

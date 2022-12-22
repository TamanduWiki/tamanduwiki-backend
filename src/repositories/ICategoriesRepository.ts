import { Category } from "@/entities/Category";

import { WithMetaProps } from "@/types/metaProps";

export interface ICategoriesRepository {
  findAllByTitle: (searchParam?: string, page?: number, per?: number) => Promise<WithMetaProps<{ categories: Category[] }>>;
  findByTitle: (title: string) => Promise<Category | undefined>;
  findById: (id: string) => Promise<Category | undefined>;
  save: (category: Category) => Promise<Category>;
  delete: (id: string) => Promise<void>;
}

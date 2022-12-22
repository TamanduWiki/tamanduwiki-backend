import { Category } from "./Category";

export interface Page {
  id: string;
  title: string;
  content: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string | null;
  categories: Category[];
}

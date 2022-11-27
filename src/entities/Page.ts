import { Page as PrismaPage } from "@prisma/client";
import { v4 as uuid } from "uuid";

export class Page implements PrismaPage {
  readonly id: string;
  title: string;
  content: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string | null;

  constructor(props: Omit<Page, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = uuid();
  }
}

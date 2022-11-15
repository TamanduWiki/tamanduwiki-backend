import { Page } from "@/entities/Page";

import { prisma } from "@/global/prismaClient";

import { IPagesRepository } from "../IPagesRepository";

export class PrismaPagesRepository implements IPagesRepository {
  async findById(id: string): Promise<Page | undefined> {
    const page = await prisma.page.findUnique({ where: { id } });

    return page || undefined;
  }

  async findBySlug(slug: string): Promise<Page | undefined> {
    const page = await prisma.page.findUnique({ where: { slug } });

    return page || undefined;
  }

  async save(page: Page): Promise<void> {
    await prisma.page.create({ data: page });
  };

  async listAll(): Promise<Page[]> {
    const pages = await prisma.page.findMany();

    return pages;
  }
}

import { Page } from "@/entities/Page";

import { prisma } from "@/global/prismaClient";

import { IPagesRepository } from "../IPagesRepository";

export class PrismaPagesRepository implements IPagesRepository {
  async delete (id: string): Promise<void> {
    await prisma.page.delete({ where: { id } });
  };

  async findById(id: string): Promise<Page | undefined> {
    const page = await prisma.page.findUnique({
      where: { id },
      include: { categories: true },
    });

    return page || undefined;
  }

  async findBySlug(slug: string): Promise<Page | undefined> {
    const page = await prisma.page.findUnique({
      where: { slug },
      include: { categories: true },
    });

    return page || undefined;
  }

  async save(page: Omit<Page, 'categories'>, categoriesTitles: string[]): Promise<Page> {
    const createdPage = await prisma.page.create({
      data: {
        ...page,
        categories: {
          connect: categoriesTitles.map(title => ({ title })),
        }
      },
      include: {
        categories: true,
      }
    });

    return createdPage;
  };

  async findAllByNameOrCategory(searchParam?: string, page?: number, per?: number) {
    const queryPage = page || 1;
    const queryPer = per || 10;

    const searchClause = {
      where: {
        OR: [
          {
            title: {
              contains: searchParam,
            },
          },
          {
            categories: {
              some: {
                title: {
                  contains: searchParam,
                },
              },
            },
          },
        ],
      },
    }

    const pages = await prisma.page.findMany({
      skip: (queryPage - 1) * queryPer,
      take: queryPer,
      ...searchClause,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        categories: true,
      },
    });

    const totalPages = await prisma.page.count({
      ...searchClause,
    });

    return {
      pages,
      meta: {
        page: queryPage,
        per: queryPer,
        total: totalPages,
      },
    };
  };
}

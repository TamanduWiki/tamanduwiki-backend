import { Page } from "@/entities/Page";

import { prisma } from "@/global/prismaClient";

import { IPagesRepository } from "../IPagesRepository";

export class PrismaPagesRepository implements IPagesRepository {
  async delete (id: string): Promise<void> {
    await prisma.page.delete({ where: { id } });
  };

  async findById(id: string): Promise<Page | undefined> {
    const page = await prisma.page.findUnique({ where: { id } });

    return page || undefined;
  }

  async findBySlug(slug: string): Promise<Page | undefined> {
    const page = await prisma.page.findUnique({ where: { slug } });

    return page || undefined;
  }

  async save(page: Page): Promise<Page> {
    const createdPage = await prisma.page.create({ data: page });

    return createdPage;
  };

  // deprecated
  // async listAll(page?: number, per?: number) {
  //   const queryPage = page || 1;
  //   const queryPer = per || 10;

  //   const pages = await prisma.page.findMany({
  //     skip: (queryPage - 1) * queryPer,
  //     take: queryPer,
  //   });

  //   const totalPages = await prisma.page.count({});

  //   return {
  //     pages,
  //     meta: {
  //       page: queryPage,
  //       per: queryPer,
  //       total: totalPages,
  //     },
  //   };
  // }

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
                category: {
                  title: {
                    contains: searchParam,
                  },
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
      }
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

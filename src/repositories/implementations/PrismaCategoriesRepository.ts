import { Category } from "@/entities/Category";

import { prisma } from "@/global/prismaClient";

import { ICategoriesRepository } from "../ICategoriesRepository";

export class PrismaCategoriesRepository implements ICategoriesRepository {
  async delete (id: string): Promise<void> {
    await prisma.category.delete({ where: { id } });
  };

  async findByTitle(title: string): Promise<Category | undefined> {
    const category = await prisma.category.findUnique({ where: { title } });

    return category || undefined;
  }

  async findById(id: string): Promise<Category | undefined> {
    const category = await prisma.category.findUnique({ where: { id } });

    return category || undefined;
  }

  async save(category: Category): Promise<Category> {
    const createdCategory = await prisma.category.create({ data: category });

    return createdCategory;
  };

  async findAllByTitle(searchParam?: string, page?: number, per?: number) {
    const queryPage = page || 1;
    const queryPer = per || 10;

    const searchClause = {
      where: {
        title: {
          contains: searchParam,
        },
      },
    }

    const categories = await prisma.category.findMany({
      skip: (queryPage - 1) * queryPer,
      take: queryPer,
      ...searchClause,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const totalCategories = await prisma.category.count({
      ...searchClause,
    });

    return {
      categories,
      meta: {
        page: queryPage,
        per: queryPer,
        total: totalCategories,
      },
    };
  };
}

/*
  Warnings:

  - You are about to drop the `CategoriesOnPages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnPages" DROP CONSTRAINT "CategoriesOnPages_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnPages" DROP CONSTRAINT "CategoriesOnPages_pageId_fkey";

-- DropTable
DROP TABLE "CategoriesOnPages";

-- CreateTable
CREATE TABLE "_CategoryToPage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToPage_AB_unique" ON "_CategoryToPage"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToPage_B_index" ON "_CategoryToPage"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToPage" ADD CONSTRAINT "_CategoryToPage_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPage" ADD CONSTRAINT "_CategoryToPage_B_fkey" FOREIGN KEY ("B") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

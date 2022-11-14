/*
  Warnings:

  - You are about to drop the column `university_tie` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "university_tie",
ADD COLUMN     "universityTie" "UniversityTie" NOT NULL DEFAULT 'student';

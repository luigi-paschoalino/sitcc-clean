/*
  Warnings:

  - You are about to drop the column `professorId` on the `codigos_professores` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "codigos_professores" DROP CONSTRAINT "codigos_professores_professorId_fkey";

-- DropIndex
DROP INDEX "codigos_professores_codigo_professorId_key";

-- AlterTable
ALTER TABLE "codigos_professores" DROP COLUMN "professorId";

/*
  Warnings:

  - Made the column `perfilProfessorId` on table `projetos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "projetos" DROP CONSTRAINT "projetos_perfilProfessorId_fkey";

-- AlterTable
ALTER TABLE "projetos" ALTER COLUMN "perfilProfessorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "projetos" ADD CONSTRAINT "projetos_perfilProfessorId_fkey" FOREIGN KEY ("perfilProfessorId") REFERENCES "perfis_professores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

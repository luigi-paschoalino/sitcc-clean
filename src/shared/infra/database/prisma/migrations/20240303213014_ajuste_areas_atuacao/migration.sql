/*
  Warnings:

  - The `areasAtuacao` column on the `perfis_professores` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "perfis_professores" DROP COLUMN "areasAtuacao",
ADD COLUMN     "areasAtuacao" JSON;

/*
  Warnings:

  - You are about to drop the column `metodologia` on the `tfgs` table. All the data in the column will be lost.
  - Added the required column `descricaoMetodologia` to the `tfgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metodoPesquisa` to the `tfgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tecnicaPesquisa` to the `tfgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tfgs" DROP COLUMN "metodologia",
ADD COLUMN     "descricaoMetodologia" VARCHAR NOT NULL,
ADD COLUMN     "metodoPesquisa" VARCHAR NOT NULL,
ADD COLUMN     "tecnicaPesquisa" VARCHAR NOT NULL;

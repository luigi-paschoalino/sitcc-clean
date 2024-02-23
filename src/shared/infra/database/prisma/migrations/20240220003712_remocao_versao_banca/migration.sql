/*
  Warnings:

  - You are about to drop the column `versao` on the `bancas` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "bancas_tccId_versao_key";

-- AlterTable
ALTER TABLE "bancas" DROP COLUMN "versao";

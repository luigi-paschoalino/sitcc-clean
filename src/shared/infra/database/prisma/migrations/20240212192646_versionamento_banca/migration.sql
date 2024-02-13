/*
  Warnings:

  - A unique constraint covering the columns `[tccId,versao]` on the table `bancas` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "bancas" ADD COLUMN     "versao" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "bancas_tccId_versao_key" ON "bancas"("tccId", "versao");

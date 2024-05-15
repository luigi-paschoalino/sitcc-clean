/*
  Warnings:

  - A unique constraint covering the columns `[tccId]` on the table `bancas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "bancas_tccId_key" ON "bancas"("tccId");

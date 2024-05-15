/*
  Warnings:

  - A unique constraint covering the columns `[usuarioId]` on the table `perfis_professores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "perfis_professores_usuarioId_key" ON "perfis_professores"("usuarioId");

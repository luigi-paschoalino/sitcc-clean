/*
  Warnings:

  - A unique constraint covering the columns `[codigo,professorId]` on the table `codigos_professores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `professorId` to the `codigos_professores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "codigos_professores" ADD COLUMN     "professorId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "codigos_professores_codigo_professorId_key" ON "codigos_professores"("codigo", "professorId");

-- AddForeignKey
ALTER TABLE "codigos_professores" ADD CONSTRAINT "codigos_professores_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

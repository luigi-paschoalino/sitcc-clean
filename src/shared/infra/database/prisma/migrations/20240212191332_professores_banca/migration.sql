/*
  Warnings:

  - Added the required column `segundoProfessorId` to the `bancas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bancas" ADD COLUMN     "segundoProfessorId" UUID NOT NULL,
ADD COLUMN     "usuarioId" UUID;

-- AddForeignKey
ALTER TABLE "bancas" ADD CONSTRAINT "bancas_segundoProfessorId_fkey" FOREIGN KEY ("segundoProfessorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

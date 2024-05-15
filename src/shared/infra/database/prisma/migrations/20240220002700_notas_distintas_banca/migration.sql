/*
  Warnings:

  - You are about to drop the column `notaApresentacao` on the `bancas` table. All the data in the column will be lost.
  - You are about to drop the column `notaTrabalho` on the `bancas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bancas" DROP COLUMN "notaApresentacao",
DROP COLUMN "notaTrabalho",
ADD COLUMN     "notaApresentacaoProfessor" DECIMAL(4,2),
ADD COLUMN     "notaApresentacaoSegundoProfessor" DECIMAL(4,2),
ADD COLUMN     "notaTrabalhoProfessor" DECIMAL(4,2),
ADD COLUMN     "notaTrabalhoSegundoProfessor" DECIMAL(4,2);

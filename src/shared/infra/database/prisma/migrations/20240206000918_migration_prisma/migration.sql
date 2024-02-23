/*
  Warnings:

  - You are about to drop the `Tfg` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tfg" DROP CONSTRAINT "Tfg_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "Tfg" DROP CONSTRAINT "Tfg_coorientadorId_fkey";

-- DropForeignKey
ALTER TABLE "Tfg" DROP CONSTRAINT "Tfg_orientadorId_fkey";

-- DropForeignKey
ALTER TABLE "bancas" DROP CONSTRAINT "bancas_tccId_fkey";

-- DropTable
DROP TABLE "Tfg";

-- CreateTable
CREATE TABLE "tfgs" (
    "id" UUID NOT NULL,
    "status" "StatusTfg" NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "palavrasChave" VARCHAR NOT NULL,
    "introducao" VARCHAR NOT NULL,
    "objetivos" VARCHAR NOT NULL,
    "bibliografia" VARCHAR NOT NULL,
    "metodologia" VARCHAR NOT NULL,
    "resultados" VARCHAR NOT NULL,
    "notaParcial" DECIMAL(4,2),
    "notaFinal" DECIMAL(4,2),
    "path" VARCHAR NOT NULL,
    "alunoId" UUID NOT NULL,
    "orientadorId" UUID NOT NULL,
    "coorientadorId" UUID,

    CONSTRAINT "tfgs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bancas" ADD CONSTRAINT "bancas_tccId_fkey" FOREIGN KEY ("tccId") REFERENCES "tfgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tfgs" ADD CONSTRAINT "tfgs_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tfgs" ADD CONSTRAINT "tfgs_orientadorId_fkey" FOREIGN KEY ("orientadorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tfgs" ADD CONSTRAINT "tfgs_coorientadorId_fkey" FOREIGN KEY ("coorientadorId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "indicadores" ADD COLUMN     "entregasFinais" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "entregasParciaisAprovadas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "entregasParciaisRealizadas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "orientacoesAceitas" INTEGER NOT NULL DEFAULT 0;

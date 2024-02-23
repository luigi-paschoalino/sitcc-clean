/*
  Warnings:

  - The values [ENTREGA_PARCIAL] on the enum `StatusTfg` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusTfg_new" AS ENUM ('MATRICULA_REALIZADA', 'ORIENTACAO_ACEITA', 'ORIENTACAO_RECUSADA', 'ENTREGA_PARCIAL_REALIZADA', 'ENTREGA_PARCIAL_APROVADA', 'ENTREGA_FINAL', 'APROVADO', 'REPROVADO');
ALTER TABLE "tfgs" ALTER COLUMN "status" TYPE "StatusTfg_new" USING ("status"::text::"StatusTfg_new");
ALTER TYPE "StatusTfg" RENAME TO "StatusTfg_old";
ALTER TYPE "StatusTfg_new" RENAME TO "StatusTfg";
DROP TYPE "StatusTfg_old";
COMMIT;

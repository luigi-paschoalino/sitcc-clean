/*
  Warnings:

  - The values [ADMIN] on the enum `TipoUsuario` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipoUsuario_new" AS ENUM ('ALUNO', 'PROFESSOR', 'COORDENADOR', 'ADMINISTRADOR');
ALTER TABLE "usuarios" ALTER COLUMN "tipo" TYPE "TipoUsuario_new" USING ("tipo"::text::"TipoUsuario_new");
ALTER TYPE "TipoUsuario" RENAME TO "TipoUsuario_old";
ALTER TYPE "TipoUsuario_new" RENAME TO "TipoUsuario";
DROP TYPE "TipoUsuario_old";
COMMIT;

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "hashRecuperacaoSenha" VARCHAR(100);

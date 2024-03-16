/*
  Warnings:

  - Added the required column `email` to the `codigos_professores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "codigos_professores" ADD COLUMN     "email" VARCHAR(255) NOT NULL;

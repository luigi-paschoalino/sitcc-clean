/*
  Warnings:

  - You are about to drop the column `path` on the `tfgs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tfgs" DROP COLUMN "path",
ADD COLUMN     "pathFinal" VARCHAR,
ADD COLUMN     "pathParcial" VARCHAR;

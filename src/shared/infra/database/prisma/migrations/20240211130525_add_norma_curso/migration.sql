-- AlterTable
ALTER TABLE "normas" ADD COLUMN     "cursoId" UUID;

-- AddForeignKey
ALTER TABLE "normas" ADD CONSTRAINT "normas_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "TIPO_ATIVIDADE" AS ENUM ('ENTREGA_PARCIAL', 'ENTREGA_FINAL', 'DATA_DEFESA');

-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('ALUNO', 'PROFESSOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "Semestre" AS ENUM ('PRIMEIRO', 'SEGUNDO');

-- CreateEnum
CREATE TYPE "StatusTfg" AS ENUM ('MATRICULA_REALIZADA', 'ORIENTACAO_ACEITA', 'ORIENTACAO_RECUSADA', 'ENTREGA_PARCIAL');

-- CreateTable
CREATE TABLE "cursos" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "codigo" CHAR(3) NOT NULL,

    CONSTRAINT "cursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(100) NOT NULL,
    "tipo" "TipoUsuario" NOT NULL,
    "cursoId" UUID NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cronogramas" (
    "id" UUID NOT NULL,
    "ano" INTEGER NOT NULL,
    "semestre" "Semestre" NOT NULL,
    "cursoId" UUID,

    CONSTRAINT "cronogramas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atividades" (
    "id" UUID NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "titulo" "TIPO_ATIVIDADE" NOT NULL,
    "descricao" VARCHAR NOT NULL,
    "cronogramaId" UUID NOT NULL,

    CONSTRAINT "atividades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "normas" (
    "id" UUID NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "descricao" VARCHAR NOT NULL,
    "link" VARCHAR(255) NOT NULL,

    CONSTRAINT "normas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfis_professores" (
    "id" UUID NOT NULL,
    "descricao" VARCHAR NOT NULL,
    "link" VARCHAR NOT NULL,
    "areasAtuacao" JSON[],
    "usuarioId" UUID NOT NULL,

    CONSTRAINT "perfis_professores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "codigos_professores" (
    "id" UUID NOT NULL,
    "codigo" VARCHAR(12) NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "codigos_professores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projetos" (
    "id" UUID NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR NOT NULL,
    "preRequisitos" VARCHAR NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "perfilProfessorId" UUID,

    CONSTRAINT "projetos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bancas" (
    "id" UUID NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "professorId" UUID NOT NULL,
    "tccId" UUID NOT NULL,
    "notaApresentacao" DECIMAL(4,2),
    "notaTrabalho" DECIMAL(4,2),

    CONSTRAINT "bancas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tfg" (
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

    CONSTRAINT "Tfg_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cursos_nome_key" ON "cursos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "cursos_codigo_key" ON "cursos"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "codigos_professores_codigo_key" ON "codigos_professores"("codigo");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cronogramas" ADD CONSTRAINT "cronogramas_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atividades" ADD CONSTRAINT "atividades_cronogramaId_fkey" FOREIGN KEY ("cronogramaId") REFERENCES "cronogramas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfis_professores" ADD CONSTRAINT "perfis_professores_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projetos" ADD CONSTRAINT "projetos_perfilProfessorId_fkey" FOREIGN KEY ("perfilProfessorId") REFERENCES "perfis_professores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bancas" ADD CONSTRAINT "bancas_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bancas" ADD CONSTRAINT "bancas_tccId_fkey" FOREIGN KEY ("tccId") REFERENCES "Tfg"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tfg" ADD CONSTRAINT "Tfg_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tfg" ADD CONSTRAINT "Tfg_orientadorId_fkey" FOREIGN KEY ("orientadorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tfg" ADD CONSTRAINT "Tfg_coorientadorId_fkey" FOREIGN KEY ("coorientadorId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

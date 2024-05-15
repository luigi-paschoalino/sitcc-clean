-- CreateTable
CREATE TABLE "indicadores" (
    "id" UUID NOT NULL,
    "quantidadeTfgs" INTEGER NOT NULL DEFAULT 0,
    "quantidadeAprovacoes" INTEGER NOT NULL DEFAULT 0,
    "quantidadeReprovacoes" INTEGER NOT NULL DEFAULT 0,
    "orientacoesRecusadas" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "indicadores_pkey" PRIMARY KEY ("id")
);

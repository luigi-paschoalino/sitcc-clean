import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration0051687735516474 implements MigrationInterface {
    name = 'Migration0051687735516474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "perfil_professor" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "descricao" character varying NOT NULL,
                "link" character varying NOT NULL,
                "usuarioId" uuid,
                CONSTRAINT "REL_094ad06c2a8c8eb9a700e3790b" UNIQUE ("usuarioId"),
                CONSTRAINT "PK_1507c11d6cd933732929b68bf20" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."atividade_titulo_enum" AS ENUM(
                'ENTREGA PARCIAL',
                'ENTREGA FINAL',
                'DATA DEFESA'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "atividade" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "data" TIMESTAMP NOT NULL,
                "titulo" "public"."atividade_titulo_enum" NOT NULL,
                "descricao" character varying NOT NULL,
                "cronogramaId" uuid,
                CONSTRAINT "PK_b06f518d68d61a858de079cb1be" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "norma" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "titulo" character varying NOT NULL,
                "descricao" character varying NOT NULL,
                "link" character varying NOT NULL,
                CONSTRAINT "PK_95f8421ca3221b3350f4b1f88bc" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "perfil_professor"
            ADD CONSTRAINT "FK_094ad06c2a8c8eb9a700e3790b4" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "atividade"
            ADD CONSTRAINT "FK_6fec6b394d7dba81afa47e7f234" FOREIGN KEY ("cronogramaId") REFERENCES "cronograma"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "atividade" DROP CONSTRAINT "FK_6fec6b394d7dba81afa47e7f234"
        `);
        await queryRunner.query(`
            ALTER TABLE "perfil_professor" DROP CONSTRAINT "FK_094ad06c2a8c8eb9a700e3790b4"
        `);
        await queryRunner.query(`
            DROP TABLE "norma"
        `);
        await queryRunner.query(`
            DROP TABLE "atividade"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."atividade_titulo_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "perfil_professor"
        `);
    }

}

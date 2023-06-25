import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration0061687736866027 implements MigrationInterface {
    name = 'Migration0061687736866027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "projeto" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "titulo" character varying NOT NULL,
                "descricao" character varying NOT NULL,
                "preRequisitos" character varying NOT NULL,
                "disponivel" boolean NOT NULL,
                "perfilProfessorId" uuid,
                CONSTRAINT "PK_87de7c3af72f824a860298c3c3e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "projeto"
            ADD CONSTRAINT "FK_863f8dc885aed5608275395fa18" FOREIGN KEY ("perfilProfessorId") REFERENCES "perfil_professor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "projeto" DROP CONSTRAINT "FK_863f8dc885aed5608275395fa18"
        `);
        await queryRunner.query(`
            DROP TABLE "projeto"
        `);
    }

}

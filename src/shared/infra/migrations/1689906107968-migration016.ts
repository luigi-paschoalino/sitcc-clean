import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration0161689906107968 implements MigrationInterface {
    name = 'Migration0161689906107968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ADD "coorientadorId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ALTER COLUMN "titulo" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ALTER COLUMN "palavras_chave" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ALTER COLUMN "introducao" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ALTER COLUMN "objetivos" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ALTER COLUMN "bibliografia" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ALTER COLUMN "metodologia" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ALTER COLUMN "resultados" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ADD CONSTRAINT "FK_641cc24dc228d8f1ec471f727bc" FOREIGN KEY ("coorientadorId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tcc" DROP CONSTRAINT "FK_641cc24dc228d8f1ec471f727bc"
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ALTER COLUMN "resultados"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ALTER COLUMN "metodologia"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ALTER COLUMN "bibliografia"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ALTER COLUMN "objetivos"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ALTER COLUMN "introducao"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ALTER COLUMN "palavras_chave"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ALTER COLUMN "titulo"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc" DROP COLUMN "coorientadorId"
        `);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration0151689735129083 implements MigrationInterface {
    name = 'Migration0151689735129083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tcc" DROP COLUMN "nota_parcial"
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ADD "nota_parcial" numeric
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc" DROP COLUMN "nota_final"
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ADD "nota_final" numeric
        `);
        await queryRunner.query(`
            ALTER TABLE "banca" DROP COLUMN "nota_final"
        `);
        await queryRunner.query(`
            ALTER TABLE "banca"
            ADD "nota_final" numeric
        `);
        await queryRunner.query(`
            ALTER TABLE "banca" DROP COLUMN "nota_apresentacao"
        `);
        await queryRunner.query(`
            ALTER TABLE "banca"
            ADD "nota_apresentacao" numeric
        `);
        await queryRunner.query(`
            ALTER TABLE "banca" DROP COLUMN "nota_trabalho"
        `);
        await queryRunner.query(`
            ALTER TABLE "banca"
            ADD "nota_trabalho" numeric
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "banca" DROP COLUMN "nota_trabalho"
        `);
        await queryRunner.query(`
            ALTER TABLE "banca"
            ADD "nota_trabalho" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "banca" DROP COLUMN "nota_apresentacao"
        `);
        await queryRunner.query(`
            ALTER TABLE "banca"
            ADD "nota_apresentacao" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "banca" DROP COLUMN "nota_final"
        `);
        await queryRunner.query(`
            ALTER TABLE "banca"
            ADD "nota_final" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc" DROP COLUMN "nota_final"
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ADD "nota_final" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc" DROP COLUMN "nota_parcial"
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ADD "nota_parcial" integer
        `);
    }

}

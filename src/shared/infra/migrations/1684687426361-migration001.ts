import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration0011684687426361 implements MigrationInterface {
    name = 'Migration0011684687426361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "usuario"
            ADD "curso" character varying(256) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "usuario"
            ADD "numero" character varying(256) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "usuario" DROP COLUMN "numero"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuario" DROP COLUMN "curso"
        `);
    }

}

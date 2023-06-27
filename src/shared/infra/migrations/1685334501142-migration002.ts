import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration0021685334501142 implements MigrationInterface {
    name = 'Migration0021685334501142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "universidade"
            ADD CONSTRAINT "UQ_48161efbedd3cf440eacd063560" UNIQUE ("nome")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "universidade" DROP CONSTRAINT "UQ_48161efbedd3cf440eacd063560"
        `);
    }

}

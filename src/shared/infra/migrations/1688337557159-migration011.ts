import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration0111688337557159 implements MigrationInterface {
    name = 'Migration0111688337557159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "banca"
            ALTER COLUMN "dia_hora"
            SET DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "banca"
            ALTER COLUMN "dia_hora" DROP DEFAULT
        `);
    }

}

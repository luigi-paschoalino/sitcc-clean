import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration0121688339388771 implements MigrationInterface {
    name = 'Migration0121688339388771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "perfil_professor"
            ADD "areasAtuacao" jsonb
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "perfil_professor" DROP COLUMN "areasAtuacao"
        `);
    }

}

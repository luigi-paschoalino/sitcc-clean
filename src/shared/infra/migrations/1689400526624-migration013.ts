import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration0131689400526624 implements MigrationInterface {
    name = 'Migration0131689400526624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "usuario"
            ADD "hashRecuperacaoSenha" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "usuario" DROP COLUMN "hashRecuperacaoSenha"
        `);
    }

}

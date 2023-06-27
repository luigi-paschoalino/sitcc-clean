import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration0091687825373020 implements MigrationInterface {
    name = 'Migration0091687825373020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ADD "alunoId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ADD CONSTRAINT "UQ_ef613fdf6d51cd3a7934424d215" UNIQUE ("alunoId")
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ADD "orientadorId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ADD CONSTRAINT "FK_ef613fdf6d51cd3a7934424d215" FOREIGN KEY ("alunoId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ADD CONSTRAINT "FK_04998162df32b8bb6a0b81bed55" FOREIGN KEY ("orientadorId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tcc" DROP CONSTRAINT "FK_04998162df32b8bb6a0b81bed55"
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc" DROP CONSTRAINT "FK_ef613fdf6d51cd3a7934424d215"
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc" DROP COLUMN "orientadorId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc" DROP CONSTRAINT "UQ_ef613fdf6d51cd3a7934424d215"
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc" DROP COLUMN "alunoId"
        `);
    }

}

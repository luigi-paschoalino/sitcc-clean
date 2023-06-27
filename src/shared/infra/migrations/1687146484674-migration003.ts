import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration0031687146484674 implements MigrationInterface {
    name = 'Migration0031687146484674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "usuario"
                RENAME COLUMN "curso" TO "cursoId"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuario" DROP COLUMN "cursoId"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuario"
            ADD "cursoId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "usuario"
            ADD CONSTRAINT "FK_62bb944ea4f0b655c37df68513f" FOREIGN KEY ("cursoId") REFERENCES "curso"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "usuario" DROP CONSTRAINT "FK_62bb944ea4f0b655c37df68513f"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuario" DROP COLUMN "cursoId"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuario"
            ADD "cursoId" character varying(256) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "usuario"
                RENAME COLUMN "cursoId" TO "curso"
        `);
    }

}

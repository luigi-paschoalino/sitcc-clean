import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration0071687740401847 implements MigrationInterface {
    name = 'Migration0071687740401847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "codigo_professor" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "codigo" character varying NOT NULL,
                "disponivel" boolean NOT NULL DEFAULT true,
                CONSTRAINT "UQ_e325e16bcc339bd9bfd4889f6be" UNIQUE ("codigo"),
                CONSTRAINT "PK_96a34243c2b1bbb7e4c9d72be1d" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "codigo_professor"
        `);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration0081687823751420 implements MigrationInterface {
    name = 'Migration0081687823751420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "banca" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "dia_hora" TIMESTAMP NOT NULL,
                "nota_final" integer,
                "nota_apresentacao" integer,
                "nota_trabalho" integer,
                "professorId" uuid NOT NULL,
                "tccId" uuid,
                CONSTRAINT "PK_93330c245614eb3af36dfedc4d9" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "banca"
            ADD CONSTRAINT "FK_74891b47615f4c8e27e2048d885" FOREIGN KEY ("tccId") REFERENCES "tcc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "banca"
            ADD CONSTRAINT "FK_226f65259a4154e71a6a8f363f9" FOREIGN KEY ("professorId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "banca" DROP CONSTRAINT "FK_226f65259a4154e71a6a8f363f9"
        `);
        await queryRunner.query(`
            ALTER TABLE "banca" DROP CONSTRAINT "FK_74891b47615f4c8e27e2048d885"
        `);
        await queryRunner.query(`
            DROP TABLE "banca"
        `);
    }

}

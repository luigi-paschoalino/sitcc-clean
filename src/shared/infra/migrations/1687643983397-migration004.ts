import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration0041687643983397 implements MigrationInterface {
    name = 'Migration0041687643983397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."cronograma_semestre_enum" AS ENUM('1', '2')
        `);
        await queryRunner.query(`
            CREATE TABLE "cronograma" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "ano" integer NOT NULL,
                "semestre" "public"."cronograma_semestre_enum" NOT NULL,
                "cursoId" uuid,
                CONSTRAINT "PK_4af766064740edf1ebc0c99bd54" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "cronograma"
            ADD CONSTRAINT "FK_343d42711d16f8f24c217e3f757" FOREIGN KEY ("cursoId") REFERENCES "curso"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cronograma" DROP CONSTRAINT "FK_343d42711d16f8f24c217e3f757"
        `);
        await queryRunner.query(`
            DROP TABLE "cronograma"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."cronograma_semestre_enum"
        `);
    }

}

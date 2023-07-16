import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration0141689490441763 implements MigrationInterface {
    name = 'Migration0141689490441763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ADD "path" character varying
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."tcc_status_enum"
            RENAME TO "tcc_status_enum_old"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."tcc_status_enum" AS ENUM(
                'MATRICULA_REALIZADA',
                'ORIENTACAO_ACEITA',
                'ORIENTACAO_RECUSADA',
                'ENTREGA_PARCIAL'
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ALTER COLUMN "status" TYPE "public"."tcc_status_enum" USING "status"::"text"::"public"."tcc_status_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."tcc_status_enum_old"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."tcc_status_enum_old" AS ENUM(
                'MATRICULA_REALIZADA',
                'ORIENTACAO_ACEITA',
                'ORIENTACAO_RECUSADA'
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc"
            ALTER COLUMN "status" TYPE "public"."tcc_status_enum_old" USING "status"::"text"::"public"."tcc_status_enum_old"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."tcc_status_enum"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."tcc_status_enum_old"
            RENAME TO "tcc_status_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "tcc" DROP COLUMN "path"
        `);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration0001684470026985 implements MigrationInterface {
    name = 'Migration0001684470026985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "universidade" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nome" character varying(256) NOT NULL,
                CONSTRAINT "PK_ee17c2fdd811211af9d64f1be91" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "instituto" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nome" character varying(256) NOT NULL,
                "universidadeId" uuid NOT NULL,
                CONSTRAINT "PK_02fb039f14f99c59e9ec7e18943" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "curso" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nome" character varying(256) NOT NULL,
                "institutoId" uuid NOT NULL,
                "codigo" character varying(256) NOT NULL,
                CONSTRAINT "PK_76073a915621326fb85f28ecc5d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tcc" (
                "id" character varying NOT NULL,
                CONSTRAINT "PK_7924c7a03584f878d6aed2b88d4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "usuario" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nome" character varying(256) NOT NULL,
                "email" character varying(256) NOT NULL,
                "senha" character varying(256) NOT NULL,
                "tipo" character varying(256) NOT NULL,
                CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "instituto"
            ADD CONSTRAINT "FK_8c05f0208bd4f6419fb3d52e303" FOREIGN KEY ("universidadeId") REFERENCES "universidade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "curso"
            ADD CONSTRAINT "FK_3e0727cc024e2beaca893a33c0d" FOREIGN KEY ("institutoId") REFERENCES "instituto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "curso" DROP CONSTRAINT "FK_3e0727cc024e2beaca893a33c0d"
        `);
        await queryRunner.query(`
            ALTER TABLE "instituto" DROP CONSTRAINT "FK_8c05f0208bd4f6419fb3d52e303"
        `);
        await queryRunner.query(`
            DROP TABLE "usuario"
        `);
        await queryRunner.query(`
            DROP TABLE "tcc"
        `);
        await queryRunner.query(`
            DROP TABLE "curso"
        `);
        await queryRunner.query(`
            DROP TABLE "instituto"
        `);
        await queryRunner.query(`
            DROP TABLE "universidade"
        `);
    }

}

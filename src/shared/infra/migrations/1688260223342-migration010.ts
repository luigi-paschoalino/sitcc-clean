import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration0101688260223342 implements MigrationInterface {
    name = 'Migration0101688260223342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "event-log" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "eventName" character varying NOT NULL,
                "eventData" jsonb NOT NULL,
                CONSTRAINT "PK_0160c56e6ee504871c2f9c87e58" PRIMARY KEY ("id")
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "event-log"
        `)
    }
}

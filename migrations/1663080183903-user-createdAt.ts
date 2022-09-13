import { MigrationInterface, QueryRunner } from "typeorm";

export class userCreatedAt1663080183903 implements MigrationInterface {
    name = 'userCreatedAt1663080183903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "createdAt"
        `);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class nicknameToUsername1663090510158 implements MigrationInterface {
    name = 'nicknameToUsername1663090510158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
                RENAME COLUMN "nickname" TO "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
                RENAME CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023" TO "UQ_fe0bb3f6520ee0469504521e710"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
                RENAME CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" TO "UQ_ad02a1be8707004cb805a4b5023"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
                RENAME COLUMN "username" TO "nickname"
        `);
    }

}

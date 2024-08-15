import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOauthIdToUserEntity1723698764979 implements MigrationInterface {
    name = 'AddOauthIdToUserEntity1723698764979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`oauthId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_b07c65387b10640a67199cc549\` (\`oauthId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_b07c65387b10640a67199cc549\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`oauthId\``);
    }

}

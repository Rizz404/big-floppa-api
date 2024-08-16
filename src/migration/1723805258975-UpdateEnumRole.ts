import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEnumRole1723805258975 implements MigrationInterface {
    name = 'UpdateEnumRole1723805258975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('ADMIN', 'USER') NOT NULL DEFAULT 'USER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('0', '1') NOT NULL DEFAULT '1'`);
    }

}

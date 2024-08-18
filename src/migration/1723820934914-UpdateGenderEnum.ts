import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateGenderEnum1723820934914 implements MigrationInterface {
    name = 'UpdateGenderEnum1723820934914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a24972ebd73b106250713dcddd\` ON \`profile\``);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`gender\` \`gender\` enum ('MALE', 'FEMALE', 'MENTAL_ILLNESS') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cat\` CHANGE \`gender\` \`gender\` enum ('MALE', 'FEMALE', 'MENTAL_ILLNESS') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cat\` CHANGE \`gender\` \`gender\` enum ('0', '1', '2') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`gender\` \`gender\` enum ('0', '1', '2') NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a24972ebd73b106250713dcddd\` ON \`profile\` (\`userId\`)`);
    }

}

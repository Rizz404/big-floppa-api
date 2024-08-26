import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeStringToDecimal1724683739164 implements MigrationInterface {
    name = 'ChangeStringToDecimal1724683739164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shipping_service\` CHANGE \`fee\` \`fee\` decimal NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`subTotal\` \`subTotal\` decimal NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`total\` \`total\` decimal NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`price\` \`price\` decimal NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`cat\` CHANGE \`price\` \`price\` decimal NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cat\` CHANGE \`price\` \`price\` decimal NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`price\` \`price\` decimal NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`total\` \`total\` decimal NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`subTotal\` \`subTotal\` decimal NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`shipping_service\` CHANGE \`fee\` \`fee\` decimal NOT NULL`);
    }

}

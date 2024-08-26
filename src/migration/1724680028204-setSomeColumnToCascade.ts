import { MigrationInterface, QueryRunner } from "typeorm";

export class SetSomeColumnToCascade1724680028204 implements MigrationInterface {
    name = 'SetSomeColumnToCascade1724680028204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`paymentMethodFee\` decimal NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`shippingServiceFee\` decimal NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`shippingServiceFee\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`paymentMethodFee\``);
    }

}

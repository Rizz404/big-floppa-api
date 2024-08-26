import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewColumnForShippingService1724596136745 implements MigrationInterface {
    name = 'AddNewColumnForShippingService1724596136745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shipping_service\` ADD \`estimationTime\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shipping_service\` DROP COLUMN \`estimationTime\``);
    }

}

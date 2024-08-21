import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotification1724255806948 implements MigrationInterface {
    name = 'AddNotification1724255806948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` varchar(36) NOT NULL, \`type\` enum ('ORDER_CREATED', 'PAYMENT_SUCCESS', 'PAYMENT_FAILED', 'ORDER_SHIPPED', 'ORDER_DELIVERED', 'ORDER_CANCELLED', 'ORDER_RETURNED', 'NEW_CAT', 'NEW_BREED', 'FLASH_SALE', 'DISCOUNT_AVAILABLE') NOT NULL, \`message\` varchar(255) NOT NULL, \`link\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastLogin\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`lastLogin\` date NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastLogin\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`lastLogin\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
    }

}

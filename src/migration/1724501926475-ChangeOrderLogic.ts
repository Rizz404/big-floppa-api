import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeOrderLogic1724501926475 implements MigrationInterface {
    name = 'ChangeOrderLogic1724501926475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_6a0ffd40a9608605f96bb071d0f\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_6fb7cd7ffd261d468bdbd092e8f\``);
        await queryRunner.query(`CREATE TABLE \`order_item\` (\`id\` varchar(36) NOT NULL, \`status\` enum ('PENDING', 'PACKAGING', 'SHIPPED', 'DELIVERED', 'RECEIVED') NOT NULL DEFAULT 'PACKAGING', \`amount\` int NOT NULL DEFAULT '1', \`price\` decimal NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`catId\` varchar(36) NULL, \`shippingServiceId\` varchar(36) NULL, \`orderId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`catId\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`shippingServiceId\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_af49ba25d9cdbde1e0fe926503d\` FOREIGN KEY (\`catId\`) REFERENCES \`cat\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_4614c973978ac45865bdbb291bf\` FOREIGN KEY (\`shippingServiceId\`) REFERENCES \`shipping_service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_646bf9ece6f45dbe41c203e06e0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_646bf9ece6f45dbe41c203e06e0\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_4614c973978ac45865bdbb291bf\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_af49ba25d9cdbde1e0fe926503d\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`status\` enum ('PACKAGING', 'SHIPPED', 'DELIVERED', 'RECEIVED') NOT NULL DEFAULT 'PACKAGING'`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`shippingServiceId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`catId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`amount\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`DROP TABLE \`order_item\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_6fb7cd7ffd261d468bdbd092e8f\` FOREIGN KEY (\`catId\`) REFERENCES \`cat\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_6a0ffd40a9608605f96bb071d0f\` FOREIGN KEY (\`shippingServiceId\`) REFERENCES \`shipping_service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

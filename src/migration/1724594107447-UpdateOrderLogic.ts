import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderLogic1724594107447 implements MigrationInterface {
    name = 'UpdateOrderLogic1724594107447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_26ba3b75368b99964d6dea5cc2c\``);
        await queryRunner.query(`CREATE TABLE \`payment_method\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(50) NOT NULL, \`description\` text NOT NULL, \`paymentFee\` decimal NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`fee\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`paymentId\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`adminFee\` decimal NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`status\` enum ('PENDING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`paymentMethodId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`userAddressId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD \`isPrimaryAddress\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_406318e2ddca3828d340ec9151f\` FOREIGN KEY (\`paymentMethodId\`) REFERENCES \`payment_method\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_a4734288e8248e76b4c7c72390f\` FOREIGN KEY (\`userAddressId\`) REFERENCES \`user_address\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_a4734288e8248e76b4c7c72390f\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_406318e2ddca3828d340ec9151f\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP COLUMN \`isPrimaryAddress\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`userAddressId\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`paymentMethodId\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`adminFee\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`paymentId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`fee\` decimal NOT NULL`);
        await queryRunner.query(`DROP TABLE \`payment_method\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_26ba3b75368b99964d6dea5cc2c\` FOREIGN KEY (\`paymentId\`) REFERENCES \`payment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

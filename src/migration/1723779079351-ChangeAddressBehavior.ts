import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeAddressBehavior1723779079351 implements MigrationInterface {
    name = 'ChangeAddressBehavior1723779079351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_1c91963ad94611e0011e393fad6\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_405e2633f40f4597ae9cb6d589d\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_c038161be1ee4d3305243da9566\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_c82c2faa0ad2b5a847cc01887e4\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_ee33dd3bf0b594748ff35497677\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP COLUMN \`countryId\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP COLUMN \`provinceId\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP COLUMN \`cityId\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP COLUMN \`districtId\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP COLUMN \`villageId\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD \`country\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD \`province\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD \`city\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD \`district\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD \`village\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP COLUMN \`village\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP COLUMN \`district\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP COLUMN \`city\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP COLUMN \`province\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP COLUMN \`country\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD \`villageId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD \`districtId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD \`cityId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD \`provinceId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD \`countryId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_ee33dd3bf0b594748ff35497677\` FOREIGN KEY (\`districtId\`) REFERENCES \`district\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_c82c2faa0ad2b5a847cc01887e4\` FOREIGN KEY (\`countryId\`) REFERENCES \`country\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_c038161be1ee4d3305243da9566\` FOREIGN KEY (\`provinceId\`) REFERENCES \`province\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_405e2633f40f4597ae9cb6d589d\` FOREIGN KEY (\`cityId\`) REFERENCES \`city\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_1c91963ad94611e0011e393fad6\` FOREIGN KEY (\`villageId\`) REFERENCES \`village\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

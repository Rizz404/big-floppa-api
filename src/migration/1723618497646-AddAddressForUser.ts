import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressForUser1723618497646 implements MigrationInterface {
    name = 'AddAddressForUser1723618497646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cat_breed\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`description\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`authorId\` varchar(36) NULL, UNIQUE INDEX \`IDX_c983ff7a1fea2b6d91f2adf20d\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_address\` (\`id\` varchar(36) NOT NULL, \`fullAddress\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, \`countryId\` varchar(36) NULL, \`provinceId\` varchar(36) NULL, \`cityId\` varchar(36) NULL, \`districtId\` varchar(36) NULL, \`villageId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`country\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_2c5aa339240c0c3ae97fcc9dc4\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`province\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`countryId\` varchar(36) NULL, UNIQUE INDEX \`IDX_aa290c4049a8aa685a81483389\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`city\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`provinceId\` varchar(36) NULL, UNIQUE INDEX \`IDX_f8c0858628830a35f19efdc0ec\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`district\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`cityId\` varchar(36) NULL, UNIQUE INDEX \`IDX_d9ed355e46edb25f094ad3a646\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`village\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`districtId\` varchar(36) NULL, UNIQUE INDEX \`IDX_1bfc7956b7cba216dc5ddffdbd\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cat\` ADD \`catBreedId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`cat_breed\` ADD CONSTRAINT \`FK_f167b635bd5caa59938b5482b3d\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cat\` ADD CONSTRAINT \`FK_89fa97bd4aa77e0f8e16b7ad1f1\` FOREIGN KEY (\`catBreedId\`) REFERENCES \`cat_breed\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_1abd8badc4a127b0f357d9ecbc2\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_c82c2faa0ad2b5a847cc01887e4\` FOREIGN KEY (\`countryId\`) REFERENCES \`country\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_c038161be1ee4d3305243da9566\` FOREIGN KEY (\`provinceId\`) REFERENCES \`province\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_405e2633f40f4597ae9cb6d589d\` FOREIGN KEY (\`cityId\`) REFERENCES \`city\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_ee33dd3bf0b594748ff35497677\` FOREIGN KEY (\`districtId\`) REFERENCES \`district\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_1c91963ad94611e0011e393fad6\` FOREIGN KEY (\`villageId\`) REFERENCES \`village\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`province\` ADD CONSTRAINT \`FK_493e19852e51a27ff8e544fd8cc\` FOREIGN KEY (\`countryId\`) REFERENCES \`country\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`city\` ADD CONSTRAINT \`FK_95959bed787b5e4fd4be4e94fc5\` FOREIGN KEY (\`provinceId\`) REFERENCES \`province\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`district\` ADD CONSTRAINT \`FK_148f1c944d0fec4114a54984da1\` FOREIGN KEY (\`cityId\`) REFERENCES \`city\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`village\` ADD CONSTRAINT \`FK_4bbcf61a66427789a31014a15cf\` FOREIGN KEY (\`districtId\`) REFERENCES \`district\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`village\` DROP FOREIGN KEY \`FK_4bbcf61a66427789a31014a15cf\``);
        await queryRunner.query(`ALTER TABLE \`district\` DROP FOREIGN KEY \`FK_148f1c944d0fec4114a54984da1\``);
        await queryRunner.query(`ALTER TABLE \`city\` DROP FOREIGN KEY \`FK_95959bed787b5e4fd4be4e94fc5\``);
        await queryRunner.query(`ALTER TABLE \`province\` DROP FOREIGN KEY \`FK_493e19852e51a27ff8e544fd8cc\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_1c91963ad94611e0011e393fad6\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_ee33dd3bf0b594748ff35497677\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_405e2633f40f4597ae9cb6d589d\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_c038161be1ee4d3305243da9566\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_c82c2faa0ad2b5a847cc01887e4\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_1abd8badc4a127b0f357d9ecbc2\``);
        await queryRunner.query(`ALTER TABLE \`cat\` DROP FOREIGN KEY \`FK_89fa97bd4aa77e0f8e16b7ad1f1\``);
        await queryRunner.query(`ALTER TABLE \`cat_breed\` DROP FOREIGN KEY \`FK_f167b635bd5caa59938b5482b3d\``);
        await queryRunner.query(`ALTER TABLE \`cat\` DROP COLUMN \`catBreedId\``);
        await queryRunner.query(`DROP INDEX \`IDX_1bfc7956b7cba216dc5ddffdbd\` ON \`village\``);
        await queryRunner.query(`DROP TABLE \`village\``);
        await queryRunner.query(`DROP INDEX \`IDX_d9ed355e46edb25f094ad3a646\` ON \`district\``);
        await queryRunner.query(`DROP TABLE \`district\``);
        await queryRunner.query(`DROP INDEX \`IDX_f8c0858628830a35f19efdc0ec\` ON \`city\``);
        await queryRunner.query(`DROP TABLE \`city\``);
        await queryRunner.query(`DROP INDEX \`IDX_aa290c4049a8aa685a81483389\` ON \`province\``);
        await queryRunner.query(`DROP TABLE \`province\``);
        await queryRunner.query(`DROP INDEX \`IDX_2c5aa339240c0c3ae97fcc9dc4\` ON \`country\``);
        await queryRunner.query(`DROP TABLE \`country\``);
        await queryRunner.query(`DROP TABLE \`user_address\``);
        await queryRunner.query(`DROP INDEX \`IDX_c983ff7a1fea2b6d91f2adf20d\` ON \`cat_breed\``);
        await queryRunner.query(`DROP TABLE \`cat_breed\``);
    }

}

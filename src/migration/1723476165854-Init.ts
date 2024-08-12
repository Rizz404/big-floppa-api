import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1723476165854 implements MigrationInterface {
    name = 'Init1723476165854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`profile\` (\`id\` varchar(36) NOT NULL, \`firstname\` varchar(50) NOT NULL, \`lastname\` varchar(50) NOT NULL, \`profilePicture\` varchar(255) NOT NULL, \`gender\` enum ('0', '1', '2') NOT NULL, \`age\` smallint NOT NULL, \`phoneNumber\` varchar(20) NOT NULL, \`bio\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(50) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('0', '1') NOT NULL DEFAULT '1', \`isOauth\` tinyint NOT NULL DEFAULT 0, \`lastLogin\` datetime NOT NULL, \`isVerified\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`profileId\` varchar(36) NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`REL_9466682df91534dd95e4dbaa61\` (\`profileId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_9466682df91534dd95e4dbaa616\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_9466682df91534dd95e4dbaa616\``);
        await queryRunner.query(`DROP INDEX \`REL_9466682df91534dd95e4dbaa61\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`profile\``);
    }

}

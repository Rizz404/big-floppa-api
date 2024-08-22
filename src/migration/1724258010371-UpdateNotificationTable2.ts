import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNotificationTable21724258010371 implements MigrationInterface {
    name = 'UpdateNotificationTable21724258010371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_1ced25315eb974b73391fb1c81b\``);
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`userId\` \`isGlobal\` varchar(36) NULL`);
        await queryRunner.query(`CREATE TABLE \`notification_users_user\` (\`notificationId\` varchar(36) NOT NULL, \`userId\` varchar(36) NOT NULL, INDEX \`IDX_cc471803e22568445b772a45ea\` (\`notificationId\`), INDEX \`IDX_9c0c1c8c13cf53180e087e7f36\` (\`userId\`), PRIMARY KEY (\`notificationId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`isGlobal\``);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`isGlobal\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`notification_users_user\` ADD CONSTRAINT \`FK_cc471803e22568445b772a45ea0\` FOREIGN KEY (\`notificationId\`) REFERENCES \`notification\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`notification_users_user\` ADD CONSTRAINT \`FK_9c0c1c8c13cf53180e087e7f364\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification_users_user\` DROP FOREIGN KEY \`FK_9c0c1c8c13cf53180e087e7f364\``);
        await queryRunner.query(`ALTER TABLE \`notification_users_user\` DROP FOREIGN KEY \`FK_cc471803e22568445b772a45ea0\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`isGlobal\``);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`isGlobal\` varchar(36) NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_9c0c1c8c13cf53180e087e7f36\` ON \`notification_users_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_cc471803e22568445b772a45ea\` ON \`notification_users_user\``);
        await queryRunner.query(`DROP TABLE \`notification_users_user\``);
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`isGlobal\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_1ced25315eb974b73391fb1c81b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

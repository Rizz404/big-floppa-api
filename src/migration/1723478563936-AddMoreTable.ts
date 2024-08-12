import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMoreTable1723478563936 implements MigrationInterface {
    name = 'AddMoreTable1723478563936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cat_picture\` (\`id\` varchar(36) NOT NULL, \`fieldname\` varchar(255) NULL, \`originalname\` varchar(255) NOT NULL, \`mimetype\` varchar(255) NOT NULL, \`size\` int NOT NULL, \`destination\` varchar(255) NULL, \`filename\` varchar(255) NULL, \`path\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`catId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cat_race\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`description\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`authorId\` varchar(36) NULL, UNIQUE INDEX \`IDX_1b57f211b0936c21b4891f601b\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cat\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`age\` smallint NOT NULL, \`description\` text NOT NULL, \`gender\` enum ('0', '1', '2') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, INDEX \`IDX_aad5842554387ee4ac802df41a\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cat_cat_races_cat_race\` (\`catId\` varchar(36) NOT NULL, \`catRaceId\` varchar(36) NOT NULL, INDEX \`IDX_4fa1c78eea620e792fff7657c1\` (\`catId\`), INDEX \`IDX_a718d83196f33476f7283da587\` (\`catRaceId\`), PRIMARY KEY (\`catId\`, \`catRaceId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cat_picture\` ADD CONSTRAINT \`FK_84dad78a8efbe029a860493b221\` FOREIGN KEY (\`catId\`) REFERENCES \`cat\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cat_race\` ADD CONSTRAINT \`FK_ba040db1bce09e81ccfbefad5e5\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cat\` ADD CONSTRAINT \`FK_21865a41bd58756f46e252cdf30\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cat_cat_races_cat_race\` ADD CONSTRAINT \`FK_4fa1c78eea620e792fff7657c1a\` FOREIGN KEY (\`catId\`) REFERENCES \`cat\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`cat_cat_races_cat_race\` ADD CONSTRAINT \`FK_a718d83196f33476f7283da5876\` FOREIGN KEY (\`catRaceId\`) REFERENCES \`cat_race\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cat_cat_races_cat_race\` DROP FOREIGN KEY \`FK_a718d83196f33476f7283da5876\``);
        await queryRunner.query(`ALTER TABLE \`cat_cat_races_cat_race\` DROP FOREIGN KEY \`FK_4fa1c78eea620e792fff7657c1a\``);
        await queryRunner.query(`ALTER TABLE \`cat\` DROP FOREIGN KEY \`FK_21865a41bd58756f46e252cdf30\``);
        await queryRunner.query(`ALTER TABLE \`cat_race\` DROP FOREIGN KEY \`FK_ba040db1bce09e81ccfbefad5e5\``);
        await queryRunner.query(`ALTER TABLE \`cat_picture\` DROP FOREIGN KEY \`FK_84dad78a8efbe029a860493b221\``);
        await queryRunner.query(`DROP INDEX \`IDX_a718d83196f33476f7283da587\` ON \`cat_cat_races_cat_race\``);
        await queryRunner.query(`DROP INDEX \`IDX_4fa1c78eea620e792fff7657c1\` ON \`cat_cat_races_cat_race\``);
        await queryRunner.query(`DROP TABLE \`cat_cat_races_cat_race\``);
        await queryRunner.query(`DROP INDEX \`IDX_aad5842554387ee4ac802df41a\` ON \`cat\``);
        await queryRunner.query(`DROP TABLE \`cat\``);
        await queryRunner.query(`DROP INDEX \`IDX_1b57f211b0936c21b4891f601b\` ON \`cat_race\``);
        await queryRunner.query(`DROP TABLE \`cat_race\``);
        await queryRunner.query(`DROP TABLE \`cat_picture\``);
    }

}

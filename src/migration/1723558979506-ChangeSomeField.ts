import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeSomeField1723558979506 implements MigrationInterface {
    name = 'ChangeSomeField1723558979506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`firstname\` \`firstname\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`lastname\` \`lastname\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`profilePicture\` \`profilePicture\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`age\` \`age\` smallint NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`phoneNumber\` \`phoneNumber\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`bio\` \`bio\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`cat\` CHANGE \`name\` \`name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`lastLogin\` \`lastLogin\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`lastLogin\` \`lastLogin\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cat\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`bio\` \`bio\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`phoneNumber\` \`phoneNumber\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`age\` \`age\` smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`profilePicture\` \`profilePicture\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`lastname\` \`lastname\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`firstname\` \`firstname\` varchar(50) NOT NULL`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageToBreed1724154211135 implements MigrationInterface {
    name = 'AddImageToBreed1724154211135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cat_breed\` ADD \`image\` varchar(255) NULL DEFAULT 'https://i.pinimg.com/736x/8a/92/c1/8a92c186ecd1ec07e49dc9f570e304cb.jpg'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cat_breed\` DROP COLUMN \`image\``);
    }

}

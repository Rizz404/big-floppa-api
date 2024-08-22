import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeCatBreedFollowed1724303474420 implements MigrationInterface {
    name = 'ChangeCatBreedFollowed1724303474420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cat_breed_followed\` CHANGE \`createAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cat_breed_followed\` CHANGE \`createdAt\` \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}

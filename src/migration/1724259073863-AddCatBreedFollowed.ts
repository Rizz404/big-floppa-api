import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCatBreedFollowed1724259073863 implements MigrationInterface {
    name = 'AddCatBreedFollowed1724259073863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cat_breed_followed\` (\`id\` varchar(36) NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, \`catBreedId\` varchar(36) NULL, UNIQUE INDEX \`IDX_763edde4ae97ec194d3ceea2f5\` (\`userId\`, \`catBreedId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cat_breed_followed\` ADD CONSTRAINT \`FK_753727c9be66d29c086dcf06df8\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cat_breed_followed\` ADD CONSTRAINT \`FK_a7495bdff6102ee7f1e5d81eb3b\` FOREIGN KEY (\`catBreedId\`) REFERENCES \`cat_breed\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cat_breed_followed\` DROP FOREIGN KEY \`FK_a7495bdff6102ee7f1e5d81eb3b\``);
        await queryRunner.query(`ALTER TABLE \`cat_breed_followed\` DROP FOREIGN KEY \`FK_753727c9be66d29c086dcf06df8\``);
        await queryRunner.query(`DROP INDEX \`IDX_763edde4ae97ec194d3ceea2f5\` ON \`cat_breed_followed\``);
        await queryRunner.query(`DROP TABLE \`cat_breed_followed\``);
    }

}

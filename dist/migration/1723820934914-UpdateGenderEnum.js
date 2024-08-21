Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"UpdateGenderEnum1723820934914",{enumerable:true,get:function(){return UpdateGenderEnum1723820934914}});class UpdateGenderEnum1723820934914{name="UpdateGenderEnum1723820934914";async up(queryRunner){await queryRunner.query(`DROP INDEX \`IDX_a24972ebd73b106250713dcddd\` ON \`profile\``);await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`gender\` \`gender\` enum ('MALE', 'FEMALE', 'MENTAL_ILLNESS') NOT NULL`);await queryRunner.query(`ALTER TABLE \`cat\` CHANGE \`gender\` \`gender\` enum ('MALE', 'FEMALE', 'MENTAL_ILLNESS') NOT NULL`)}async down(queryRunner){await queryRunner.query(`ALTER TABLE \`cat\` CHANGE \`gender\` \`gender\` enum ('0', '1', '2') NOT NULL`);await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`gender\` \`gender\` enum ('0', '1', '2') NOT NULL`);await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a24972ebd73b106250713dcddd\` ON \`profile\` (\`userId\`)`)}}
//# sourceMappingURL=1723820934914-UpdateGenderEnum.js.map
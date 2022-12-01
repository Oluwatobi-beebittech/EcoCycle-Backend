import { MigrationInterface, QueryRunner } from 'typeorm';

export class LazerPayKeyIntegration1669932691135 implements MigrationInterface {
  name = 'LazerPayKeyIntegration1669932691135';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`id\` \`lazerPayKeyLazerPayKeyId\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `CREATE TABLE \`lazer_pay_key\` (\`lazerPayKeyId\` varchar(36) NOT NULL, \`secretKey\` varchar(100) NOT NULL, \`publicKey\` varchar(100) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`lazerPayKeyId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`lazerPayKeyLazerPayKeyId\` \`lazerPayKeyLazerPayKeyId\` int NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD PRIMARY KEY (\`lazerPayKeyLazerPayKeyId\`, \`userId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`lazerPayKeyLazerPayKeyId\` \`lazerPayKeyLazerPayKeyId\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`lazerPayKeyLazerPayKeyId\` \`lazerPayKeyLazerPayKeyId\` int NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD PRIMARY KEY (\`userId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`lazerPayKeyLazerPayKeyId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`lazerPayKeyLazerPayKeyId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_cc694f628be7eed31a6668256b\` (\`lazerPayKeyLazerPayKeyId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_cc694f628be7eed31a6668256b\` ON \`user\` (\`lazerPayKeyLazerPayKeyId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_cc694f628be7eed31a6668256bf\` FOREIGN KEY (\`lazerPayKeyLazerPayKeyId\`) REFERENCES \`lazer_pay_key\`(\`lazerPayKeyId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_cc694f628be7eed31a6668256bf\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_cc694f628be7eed31a6668256b\` ON \`user\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP INDEX \`IDX_cc694f628be7eed31a6668256b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`lazerPayKeyLazerPayKeyId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`lazerPayKeyLazerPayKeyId\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD PRIMARY KEY (\`lazerPayKeyLazerPayKeyId\`, \`userId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`lazerPayKeyLazerPayKeyId\` \`lazerPayKeyLazerPayKeyId\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`lazerPayKeyLazerPayKeyId\` \`lazerPayKeyLazerPayKeyId\` int NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD PRIMARY KEY (\`lazerPayKeyLazerPayKeyId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`lazerPayKeyLazerPayKeyId\` \`lazerPayKeyLazerPayKeyId\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`DROP TABLE \`lazer_pay_key\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`lazerPayKeyLazerPayKeyId\` \`id\` int NOT NULL AUTO_INCREMENT`,
    );
  }
}

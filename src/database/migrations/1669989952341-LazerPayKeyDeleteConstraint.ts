import { MigrationInterface, QueryRunner } from 'typeorm';

export class LazerPayKeyDeleteConstraint1669989952341
  implements MigrationInterface
{
  name = 'LazerPayKeyDeleteConstraint1669989952341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_cc694f628be7eed31a6668256bf\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_cc694f628be7eed31a6668256b\` ON \`user\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`lazerPayKeyLazerPayKeyId\` \`lazerPayKeyLazerPayKeyId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_cc694f628be7eed31a6668256bf\` FOREIGN KEY (\`lazerPayKeyLazerPayKeyId\`) REFERENCES \`lazer_pay_key\`(\`lazerPayKeyId\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_cc694f628be7eed31a6668256bf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`lazerPayKeyLazerPayKeyId\` \`lazerPayKeyLazerPayKeyId\` varchar(36) NULL DEFAULT ''NULL''`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_cc694f628be7eed31a6668256b\` ON \`user\` (\`lazerPayKeyLazerPayKeyId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_cc694f628be7eed31a6668256bf\` FOREIGN KEY (\`lazerPayKeyLazerPayKeyId\`) REFERENCES \`lazer_pay_key\`(\`lazerPayKeyId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

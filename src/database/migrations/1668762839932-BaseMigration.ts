import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseMigration1668762839932 implements MigrationInterface {
  name = 'BaseMigration1668762839932';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(36) NOT NULL, \`firstName\` varchar(20) NOT NULL, \`lastName\` varchar(20) NOT NULL, \`email\` varchar(100) NOT NULL, \`phoneNumber\` varchar(20) NOT NULL, \`password\` varchar(255) NOT NULL, \`ecoChampion\` enum ('ECO_PROCESSOR', 'ECO_COLLECTOR') NOT NULL DEFAULT 'ECO_COLLECTOR', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_f2578043e491921209f5dadd08\` (\`phoneNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_f2578043e491921209f5dadd08\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}

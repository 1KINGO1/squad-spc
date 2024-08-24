import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCreateDate1724504995892 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `ALTER TABLE limit ADD create_date timestamp DEFAULT CURRENT_TIMESTAMP;`
        )
        await queryRunner.query(
          `ALTER TABLE list ADD create_date timestamp DEFAULT CURRENT_TIMESTAMP;`
        )
        await queryRunner.query(
          `ALTER TABLE balance ADD create_date timestamp DEFAULT CURRENT_TIMESTAMP;`
        )
        await queryRunner.query(
          `ALTER TABLE permission ADD create_date timestamp DEFAULT CURRENT_TIMESTAMP;`
        )
        await queryRunner.query(
          `ALTER TABLE group ADD create_date timestamp DEFAULT CURRENT_TIMESTAMP;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `ALTER TABLE limit DROP create_date;`
        )
        await queryRunner.query(
          `ALTER TABLE list DROP create_date;`
        )
        await queryRunner.query(
          `ALTER TABLE balance DROP create_date;`
        )
        await queryRunner.query(
          `ALTER TABLE permission DROP create_date;`
        )
        await queryRunner.query(
          `ALTER TABLE group DROP create_date;`
        )
    }

}

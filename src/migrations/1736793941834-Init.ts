import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1736793941834 implements MigrationInterface {
    name = 'Init1736793941834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "value" character varying(50) NOT NULL, "create_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE ("name"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "create_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_8a45300fd825918f3b40195fbdc" UNIQUE ("name"), CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "record" ("id" SERIAL NOT NULL, "username" character varying(100) NOT NULL, "steam_id" character varying(17) NOT NULL, "create_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "expire_date" TIMESTAMP WITH TIME ZONE, "groupId" integer, "clanId" integer, "authorId" integer, "listId" integer, CONSTRAINT "PK_5cb1f4d1aff275cf9001f4343b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "description" character varying(500) NOT NULL, "price" integer NOT NULL, "duration" bigint, "tag" character varying(20), "tagColor" character varying(8), "productColor" character varying(8), "shouldSale" boolean NOT NULL DEFAULT true, "create_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "listId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "list" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "path" character varying(10) NOT NULL, "create_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_d7ff6872c82ac4a87ff986a38d8" UNIQUE ("name"), CONSTRAINT "UQ_ce7fbe6f863c37b02c66bf281a4" UNIQUE ("path"), CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "limit" ("id" SERIAL NOT NULL, "limit" integer, "create_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "clanId" integer, "groupId" integer, CONSTRAINT "PK_6e82b66197d877e780e19c0aadc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clan" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "tag" character varying(10) NOT NULL, "create_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_25593abe237e38783ed2e91838f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "balance" ("id" SERIAL NOT NULL, "balance" integer NOT NULL DEFAULT '0', "create_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_9297a70b26dc787156fa49de26" UNIQUE ("userId"), CONSTRAINT "PK_079dddd31a81672e8143a649ca0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(50) NOT NULL, "avatar_url" character varying(500) NOT NULL, "steam_id" character varying(17) NOT NULL, "discord_id" character varying(22), "permission" smallint NOT NULL DEFAULT '0', "create_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "last_login" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_b592c1ae1b8be56046a03a616ae" UNIQUE ("steam_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchase" ("id" SERIAL NOT NULL, "steam_id" character varying(17) NOT NULL, "username" character varying(100) NOT NULL, "permissions" character varying(300) NOT NULL, "product_name" character varying(300) NOT NULL, "product_duration" bigint, "purchase_price" integer NOT NULL, "isCanceled" boolean NOT NULL DEFAULT false, "create_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "expire_date" TIMESTAMP WITH TIME ZONE, "cancel_date" TIMESTAMP WITH TIME ZONE, "productId" integer, "listId" integer, CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_permissions_permission" ("groupId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_d9b4ec30d48ed8515908f47f691" PRIMARY KEY ("groupId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_24022d7e409de3835f25603d35" ON "group_permissions_permission" ("groupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0777702b851f7662e2678b4568" ON "group_permissions_permission" ("permissionId") `);
        await queryRunner.query(`CREATE TABLE "product_permissions_permission" ("productId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_8cafeb99111244b58ac6ac91006" PRIMARY KEY ("productId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_32e043b1f6f33b0d0d036163cb" ON "product_permissions_permission" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2f45ed0d305cacd89315d0de0e" ON "product_permissions_permission" ("permissionId") `);
        await queryRunner.query(`CREATE TABLE "clan_allowed_lists_list" ("clanId" integer NOT NULL, "listId" integer NOT NULL, CONSTRAINT "PK_0514b154bceff3895bcfc268ae6" PRIMARY KEY ("clanId", "listId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2cd452dc6ae00f10d409110471" ON "clan_allowed_lists_list" ("clanId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fac65b1a437c3b230fb3629151" ON "clan_allowed_lists_list" ("listId") `);
        await queryRunner.query(`CREATE TABLE "user_clans_clan" ("userId" integer NOT NULL, "clanId" integer NOT NULL, CONSTRAINT "PK_61a72a8fb29027d142e4444b70c" PRIMARY KEY ("userId", "clanId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d8ea517cbff150db57c1c73ac2" ON "user_clans_clan" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b98cd75674d091647b79e10987" ON "user_clans_clan" ("clanId") `);
        await queryRunner.query(`ALTER TABLE "record" ADD CONSTRAINT "FK_3ba5871b774478a38670465b892" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "record" ADD CONSTRAINT "FK_ea7136b93a17f79fb1c56e7ffb7" FOREIGN KEY ("clanId") REFERENCES "clan"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "record" ADD CONSTRAINT "FK_e2fefc7d1215124d9457cd1b24c" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "record" ADD CONSTRAINT "FK_34eb764e33a74e92db5b171dbb5" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_65fd8e32c06dbadb1dee0253476" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "limit" ADD CONSTRAINT "FK_84eb7929f3976fb1465ccf82779" FOREIGN KEY ("clanId") REFERENCES "clan"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "limit" ADD CONSTRAINT "FK_c397602f13372a28d62ba3acb4b" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "balance" ADD CONSTRAINT "FK_9297a70b26dc787156fa49de26b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_2629a6c2b38257d165179d0b4c9" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_9af3a556aa0f166dd771a1e6c46" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_permissions_permission" ADD CONSTRAINT "FK_24022d7e409de3835f25603d35d" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_permissions_permission" ADD CONSTRAINT "FK_0777702b851f7662e2678b45689" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_permissions_permission" ADD CONSTRAINT "FK_32e043b1f6f33b0d0d036163cbe" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_permissions_permission" ADD CONSTRAINT "FK_2f45ed0d305cacd89315d0de0ef" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "clan_allowed_lists_list" ADD CONSTRAINT "FK_2cd452dc6ae00f10d409110471d" FOREIGN KEY ("clanId") REFERENCES "clan"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "clan_allowed_lists_list" ADD CONSTRAINT "FK_fac65b1a437c3b230fb36291519" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_clans_clan" ADD CONSTRAINT "FK_d8ea517cbff150db57c1c73ac24" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_clans_clan" ADD CONSTRAINT "FK_b98cd75674d091647b79e109871" FOREIGN KEY ("clanId") REFERENCES "clan"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_clans_clan" DROP CONSTRAINT "FK_b98cd75674d091647b79e109871"`);
        await queryRunner.query(`ALTER TABLE "user_clans_clan" DROP CONSTRAINT "FK_d8ea517cbff150db57c1c73ac24"`);
        await queryRunner.query(`ALTER TABLE "clan_allowed_lists_list" DROP CONSTRAINT "FK_fac65b1a437c3b230fb36291519"`);
        await queryRunner.query(`ALTER TABLE "clan_allowed_lists_list" DROP CONSTRAINT "FK_2cd452dc6ae00f10d409110471d"`);
        await queryRunner.query(`ALTER TABLE "product_permissions_permission" DROP CONSTRAINT "FK_2f45ed0d305cacd89315d0de0ef"`);
        await queryRunner.query(`ALTER TABLE "product_permissions_permission" DROP CONSTRAINT "FK_32e043b1f6f33b0d0d036163cbe"`);
        await queryRunner.query(`ALTER TABLE "group_permissions_permission" DROP CONSTRAINT "FK_0777702b851f7662e2678b45689"`);
        await queryRunner.query(`ALTER TABLE "group_permissions_permission" DROP CONSTRAINT "FK_24022d7e409de3835f25603d35d"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_9af3a556aa0f166dd771a1e6c46"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_2629a6c2b38257d165179d0b4c9"`);
        await queryRunner.query(`ALTER TABLE "balance" DROP CONSTRAINT "FK_9297a70b26dc787156fa49de26b"`);
        await queryRunner.query(`ALTER TABLE "limit" DROP CONSTRAINT "FK_c397602f13372a28d62ba3acb4b"`);
        await queryRunner.query(`ALTER TABLE "limit" DROP CONSTRAINT "FK_84eb7929f3976fb1465ccf82779"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_65fd8e32c06dbadb1dee0253476"`);
        await queryRunner.query(`ALTER TABLE "record" DROP CONSTRAINT "FK_34eb764e33a74e92db5b171dbb5"`);
        await queryRunner.query(`ALTER TABLE "record" DROP CONSTRAINT "FK_e2fefc7d1215124d9457cd1b24c"`);
        await queryRunner.query(`ALTER TABLE "record" DROP CONSTRAINT "FK_ea7136b93a17f79fb1c56e7ffb7"`);
        await queryRunner.query(`ALTER TABLE "record" DROP CONSTRAINT "FK_3ba5871b774478a38670465b892"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b98cd75674d091647b79e10987"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d8ea517cbff150db57c1c73ac2"`);
        await queryRunner.query(`DROP TABLE "user_clans_clan"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fac65b1a437c3b230fb3629151"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2cd452dc6ae00f10d409110471"`);
        await queryRunner.query(`DROP TABLE "clan_allowed_lists_list"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2f45ed0d305cacd89315d0de0e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_32e043b1f6f33b0d0d036163cb"`);
        await queryRunner.query(`DROP TABLE "product_permissions_permission"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0777702b851f7662e2678b4568"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_24022d7e409de3835f25603d35"`);
        await queryRunner.query(`DROP TABLE "group_permissions_permission"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "balance"`);
        await queryRunner.query(`DROP TABLE "clan"`);
        await queryRunner.query(`DROP TABLE "limit"`);
        await queryRunner.query(`DROP TABLE "list"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "record"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}

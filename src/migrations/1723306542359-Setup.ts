import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Setup1723306542359 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log("Creating tables... ");
    await this.createUsersTable(queryRunner);
    await this.createClansTable(queryRunner);
    await this.createLimitsTable(queryRunner);
    await this.createGroupTable(queryRunner);
    await this.createPermissionTable(queryRunner);
    await this.createRecordTable(queryRunner);
    await this.createListTable(queryRunner);
    await this.createBalanceTable(queryRunner);
    await this.createProductTable(queryRunner);
    console.log("Creating relations...");
    await this.createClanAllowedListTable(queryRunner);
    await this.createGroupPermissionsToPermissions(queryRunner);
    await this.createUserClansToClans(queryRunner);
    await this.createForeignKeys(queryRunner);
    await this.createProductToPermission(queryRunner);
  }

  private async createUsersTable(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true
          },
          {
            name: "username",
            type: "varchar",
            length: "50"
          },
          {
            name: "avatar_url",
            type: "varchar",
            length: "500"
          },
          {
            name: "steam_id",
            type: "varchar",
            length: "17",
            isUnique: true
          },
          {
            name: "discord_id",
            type: "varchar",
            length: "22",
            isNullable: true,
            default: null
          },
          {
            name: "permission",
            type: "smallint",
            default: 0
          },
          {
            name: "create_date",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP"
          },
          {
            name: "last_login",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP"
          }
        ]
      }),
      true
    );
  }

  private async createClansTable(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "clan",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true
          },
          {
            name: "name",
            type: "varchar",
            length: "50"
          },
          {
            name: "tag",
            type: "varchar",
            length: "10"
          },
          {
            name: "create_date",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP"
          }
        ]
      }),
      true
    );
  }

  private async createLimitsTable(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "limit",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true
          },
          {
            name: "clanId",
            type: "int"
          },
          {
            name: "groupId",
            type: "int"
          },
          {
            name: "limit",
            type: "int",
            isNullable: true,
            default: null
          }
        ]
      }),
      true
    );
  }

  private async createGroupTable(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "group",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true
          },
          {
            name: "name",
            type: "varchar",
            length: "50",
            isUnique: true
          }
        ]
      }),
      true
    );
  }

  private async createPermissionTable(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "permission",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true
          },
          {
            name: "name",
            type: "varchar",
            length: "50",
            isUnique: true
          },
          {
            name: "value",
            type: "varchar",
            length: "50"
          }
        ]
      }),
      true
    );
  }

  private async createRecordTable(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "record",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true
          },
          {
            name: "username",
            type: "varchar",
            length: "100"
          },
          {
            name: "steam_id",
            type: "varchar",
            length: "17"
          },
          {
            name: "groupId",
            type: "int"
          },
          {
            name: "clanId",
            type: "int"
          },
          {
            name: "authorId",
            type: "int"
          },
          {
            name: "listId",
            type: "int"
          },
          {
            name: "create_date",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP"
          },
          {
            name: "expire_date",
            type: "timestamp",
            isNullable: true,
            default: null
          }
        ]
      }),
      true
    );
  }

  private async createListTable(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "list",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true
          },
          {
            name: "name",
            type: "varchar",
            length: "50",
            isUnique: true
          },
          {
            name: "path",
            type: "varchar",
            length: "10",
            isUnique: true
          }
        ]
      }), true);
  }

  private async createBalanceTable(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "balance",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true
          },
          {
            name: "userId",
            type: "int"
          },
          {
            name: "balance",
            type: "int",
            default: 0
          }
        ]
      }), true);
  }

  private async createProductTable(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "product",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true
          },
          {
            name: "name",
            type: "varchar",
            length: "50"
          },
          {
            name: "description",
            type: "varchar",
            length: "500"
          },
          {
            name: "price",
            type: "int"
          },
          {
            name: "duration",
            type: "bigint",
            isNullable: true,
            default: null
          },
          {
            name: "tag",
            type: "varchar",
            length: "20",
            isNullable: true,
            default: null
          },
          {
            name: "tagColor",
            type: "varchar",
            length: "8",
            isNullable: true,
            default: null
          },
          {
            name: "productColor",
            type: "varchar",
            length: "8",
            isNullable: true,
            default: null
          },
          {
            name: "shouldSale",
            type: "boolean",
            default: false
          },
          {
            name: "listId",
            type: "int"
          },
          {
            name: "create_date",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP"
          }
        ]
      }), true);
  }

  private async createClanAllowedListTable(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "clan_allowed_lists_list",
        columns: [
          {
            name: "clanId",
            type: "int",
            isPrimary: true
          },
          {
            name: "listId",
            type: "int",
            isPrimary: true
          }
        ]
      }), true);
  }

  private async createGroupPermissionsToPermissions(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "group_permissions_permission",
        columns: [
          {
            name: "groupId",
            type: "int",
            isPrimary: true
          },
          {
            name: "permissionId",
            type: "int",
            isPrimary: true
          }
        ]
      }), true);
  }

  private async createUserClansToClans(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_clans_clan",
        columns: [
          {
            name: "userId",
            type: "int",
            isPrimary: true
          },
          {
            name: "clanId",
            type: "int",
            isPrimary: true
          }
        ]
      }), true);
  }

  private async createProductToPermission(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "product_permissions_permission",
        columns: [
          {
            name: "productId",
            type: "int",
            isPrimary: true
          },
          {
            name: "permissionId",
            type: "int",
            isPrimary: true
          }
        ]
      }), true);
  }

  private async createForeignKeys(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "limit",
      new TableForeignKey({
        columnNames: ["clanId"],
        referencedTableName: "clan",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
    await queryRunner.createForeignKey(
      "limit",
      new TableForeignKey({
        columnNames: ["groupId"],
        referencedTableName: "group",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
    await queryRunner.createForeignKey(
      "record",
      new TableForeignKey({
        columnNames: ["groupId"],
        referencedTableName: "group",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
    await queryRunner.createForeignKey(
      "record",
      new TableForeignKey({
        columnNames: ["clanId"],
        referencedTableName: "clan",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
    await queryRunner.createForeignKey(
      "record",
      new TableForeignKey({
        columnNames: ["authorId"],
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL"
      })
    );
    await queryRunner.createForeignKey(
      "record",
      new TableForeignKey({
        columnNames: ["listId"],
        referencedTableName: "list",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
    await queryRunner.createForeignKey(
      "balance",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
    await queryRunner.createForeignKey(
      "clan_allowed_lists_list",
      new TableForeignKey({
        columnNames: ["clanId"],
        referencedTableName: "clan",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
    await queryRunner.createForeignKey(
      "clan_allowed_lists_list",
      new TableForeignKey({
        columnNames: ["listId"],
        referencedTableName: "list",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
    await queryRunner.createForeignKey(
      "group_permissions_permission",
      new TableForeignKey({
        columnNames: ["groupId"],
        referencedTableName: "group",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
    await queryRunner.createForeignKey(
      "group_permissions_permission",
      new TableForeignKey({
        columnNames: ["permissionId"],
        referencedTableName: "permission",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
    await queryRunner.createForeignKey(
      "user_clans_clan",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
    await queryRunner.createForeignKey(
      "user_clans_clan",
      new TableForeignKey({
        columnNames: ["clanId"],
        referencedTableName: "clan",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
    await queryRunner.createForeignKey(
      "product",
      new TableForeignKey({
        columnNames: ["listId"],
        referencedTableName: "list",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
    await queryRunner.createForeignKey(
      "product_permissions_permission",
      new TableForeignKey({
        columnNames: ["productId"],
        referencedTableName: "product",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
    await queryRunner.createForeignKey(
      "product_permissions_permission",
      new TableForeignKey({
        columnNames: ["permissionId"],
        referencedTableName: "permission",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
    await queryRunner.dropTable("clan");
    await queryRunner.dropTable("limit");
    await queryRunner.dropTable("group");
    await queryRunner.dropTable("permission");
    await queryRunner.dropTable("record");
    await queryRunner.dropTable("list");
    await queryRunner.dropTable("balance");
    await queryRunner.dropTable("clan_allowed_lists_list");
    await queryRunner.dropTable("group_permissions_permission");
    await queryRunner.dropTable("user");
    await queryRunner.dropTable("product");
    await queryRunner.dropTable('product_permissions_permission');
  }
}

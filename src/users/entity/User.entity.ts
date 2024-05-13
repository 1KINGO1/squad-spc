import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Clan } from "../../clans/entity/Clan.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50 })
  username: string;

  @Column({ type: "varchar", length: 500 })
  avatar_url: string;

  @Column({ type: "varchar", length: 17, unique: true })
  steam_id: string;

  @Column({ type: "varchar", length: 22, nullable: true, default: null })
  discord_id: string | null;

  @Column({ type: "smallint", default: 0 })
  permission: number;

  @ManyToMany(
    () => Clan,
    clan => clan.clan_leaders,
    { onDelete: "CASCADE", cascade: true }
  )
  @JoinTable()
  clans: Clan[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  create_date: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  last_login: Date;
}
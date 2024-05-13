import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../permissions/entity/Group.entity";
import { User } from "../../users/entity/User.entity";
import { List } from "../../lists/entity/List.entity";
import { Limit } from "./Limit.entity";

@Entity()
export class Clan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50})
  name: string;

  @Column({type: 'varchar', length: 10})
  tag: string;

  @ManyToMany(() => User, user => user.clans, { onDelete: "CASCADE" })
  clan_leaders: User[];

  @ManyToMany(() => List, (list) => list.clans, { onDelete: "CASCADE" })
  @JoinTable()
  allowed_lists: List[];

  @OneToMany(() => Limit, limit => limit.clan)
  limits: Limit[];

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  create_date: Date;
}
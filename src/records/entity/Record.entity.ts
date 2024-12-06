import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../permissions/entity/Group.entity";
import { Clan } from "../../clans/entity/Clan.entity";
import { User } from "../../users/entity/User.entity";
import { List } from "../../lists/entity/List.entity";

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100})
  username: string;

  @Column({ type: 'varchar', length: 17})
  steam_id: string;

  @ManyToOne(() => Group, {onDelete: 'CASCADE'})
  group: Group;

  @ManyToOne(() => Clan, {onDelete: 'CASCADE'})
  clan: Clan;

  @ManyToOne(() => User, {onDelete: 'SET NULL'})
  author: User;

  @ManyToOne(() => List, list => list.records,{onDelete: 'CASCADE'})
  list: List;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;

  @Column({ type: 'timestamp with time zone', default: null, nullable: true })
  expire_date: Date | null;
}

import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Group } from "../../permissions/entity/Group.entity";
import { Clan } from "./Clan.entity";

@Entity()
export class Limit {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Clan, clan => clan.limits, {onDelete: 'CASCADE'})
  @JoinColumn()
  clan: Clan;

  @OneToOne(() => Group, {onDelete: 'CASCADE'})
  @JoinColumn()
  group: Group;

  @Column({ default: null, type: 'int' })
  limit: number | null;
}
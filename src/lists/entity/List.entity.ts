import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Record } from "../../records/entity/Record.entity";
import { Clan } from "../../clans/entity/Clan.entity";

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50, unique: true})
  name: string;

  @Column({type: 'varchar', length: 10, unique: true})
  path: string;

  @OneToMany(() => Record, record => record.list)
  records: Record[];

  @ManyToMany(() => Clan, clan => clan.allowed_lists, { onDelete: "CASCADE" })
  clans: Clan[];
}
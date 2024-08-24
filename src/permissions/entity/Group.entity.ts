import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./Permission.entity";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50, unique: true})
  name: string;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  create_date: Date;
}
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Clan } from "../../clans/entity/Clan.entity";
import { User } from "../../users/entity/User.entity";
import { List } from "../../lists/entity/List.entity";
import { Permission } from "../../permissions/entity/Permission.entity";
import { Purchase } from "../../purchases/entity/Purchase.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", length: 20})
  name: string;

  @Column({type: "varchar", length: 500})
  description: string;

  @Column({type: "int"})
  price: number;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @Column({type: "bigint", nullable: true, default: null})
  duration: number | null;

  @Column({type: "varchar", length: 20, nullable: true, default: null})
  tag: string | null;

  @Column({type: "varchar", length: 8, nullable: true, default: null})
  tagColor: string | null;

  @Column({type: "varchar", length: 8, nullable: true, default: null})
  productColor: string | null;

  @Column({type: "boolean", default: true})
  shouldSale: boolean;

  @ManyToOne(() => List, list => list.products,{onDelete: 'CASCADE'})
  list: List;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;
}
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
import { Product } from "../../products/entity/Product.entity";

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 17})
  steam_id: string;

  @Column({ type: 'varchar', length: 100})
  username: string;

  @Column({ type: 'varchar', length: 300})
  permissions: string;

  @Column({ type: 'varchar', length: 300})
  product_name: string;

  @Column({ type: 'bigint', nullable: true})
  product_duration: number | null;

  @Column({ type: 'int'})
  purchase_price: number;

  @Column({ type: 'boolean', default: false, name: 'isCanceled' })
  isCanceled: boolean;

  @Column({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
  create_date: Date;

  @Column({ type: 'timestamp with time zone', default: null, nullable: true })
  expire_date: Date | null;

  @Column({ type: 'timestamp with time zone', default: null, nullable: true })
  cancel_date: Date | null;

  @ManyToOne(() => List, {onDelete: 'SET NULL'})
  @JoinColumn({ name: 'listId' })
  list: List;

  @ManyToOne(() => Product, {onDelete: 'SET NULL'})
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ nullable: true })
  productId: number;

  @Column({ nullable: true })
  listId: number;
}

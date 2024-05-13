import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50, unique: true})
  name: string;

  @Column({type: 'varchar', length: 50})
  value: string
}
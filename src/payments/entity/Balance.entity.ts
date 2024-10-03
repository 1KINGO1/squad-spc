import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Clan } from "../../clans/entity/Clan.entity";
import { User } from "../../users/entity/User.entity";
import { Version } from "@nestjs/common";

@Entity()
export class Balance {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    () => User,
      user => user.balance,
    {onDelete: "CASCADE", cascade: true}
  )
  @JoinColumn()
  user: User;

  @Column({type: "int", default: 0})
  balance: number

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  create_date: Date;
}

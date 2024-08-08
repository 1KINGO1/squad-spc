import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Balance } from "./entity/Balance.entity";
import { User } from "../users/entity/User.entity";
import { ConfigService } from "../config/config.service";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Balance) private balanceRepository: Repository<Balance>,
    private configService: ConfigService
  ) {}

  private isAvailable(){
    if (!this.configService.get("payment.general.enabled")) throw new BadRequestException("Payments are disabled");
  }

  private async createBalance(user: User){
    this.isAvailable();
    const existingBalance = await this.getBalanceByUser(user);
    if (existingBalance) throw new BadRequestException("User already has balance");
    const balance = this.balanceRepository.create({user});
    return this.balanceRepository.save(balance);
  }

  private async getBalanceByUser(user: User) {
    this.isAvailable();
    const balance = await this.balanceRepository.findOneBy({ user: {steam_id: user.steam_id} });
    if (!balance) return null;
    return balance;
  }

  async getOrCreateBalance(user: User){
    this.isAvailable();
    const existingBalance = await this.getBalanceByUser(user);
    if (existingBalance) return existingBalance;

    return await this.createBalance(user);
  }

  async addBalance(user: User, amount: number){
    this.isAvailable();
    const balance = await this.getOrCreateBalance(user);
    balance.balance += Math.floor(amount);
    return this.balanceRepository.save(balance);
  }
}

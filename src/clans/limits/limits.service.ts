import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Clan } from "../entity/Clan.entity";
import { Repository } from "typeorm";
import { Limit } from "../entity/Limit.entity";
import { PermissionsService } from "../../permissions/permissions.service";
import { ListsService } from "../../lists/lists.service";
import { CreateLimitDto } from "../dtos/create-limit.dto";
import { ClansService } from "../clans.service";
import { UpdateLimitDto } from "../dtos/update-limit.dto";

@Injectable()
export class LimitsService {

  constructor(
    @InjectRepository(Limit) private limitsRepository: Repository<Limit>,
    private permissionsService: PermissionsService,
    private listsService: ListsService,
    private clansService: ClansService
  ) {}

  async getLimitsByClanId(clanId: number) {
    const clan = await this.clansService.getClanById(clanId);
    return this.limitsRepository.find({where: { clan: {id: clan.id} }, relations: ["group"]});
  }

  async getLimitById(limitId: number) {
    const limit = await this.limitsRepository.findOne({where: {id: limitId}});
    if (!limit) {
      throw new BadRequestException("Limit does not exist");
    }
    return limit;
  }


  async createLimit(clanId: number, createObj: CreateLimitDto) {
    const group = await this.permissionsService.getGroupById(createObj.group_id);
    const clan = await this.clansService.getClanById(clanId);

    const existingLimit = await this.limitsRepository.findOne({where: {clan: {id: clan.id}, group: {id: group.id}}});

    if (existingLimit) {
      throw new BadRequestException("Limit already exists");
    }

    const limit = this.limitsRepository.create({
      limit: createObj.limit || null,
    });
    limit.clan = clan;
    limit.group = group;

    return this.limitsRepository.save(limit);
  }

  async deleteLimit(limitId: number) {
    const limit = await this.getLimitById(limitId);
    return this.limitsRepository.remove(limit);
  }

  async updateLimit(limitId: number, updateObj: UpdateLimitDto) {
    const limit = await this.getLimitById(limitId);
    limit.limit = updateObj.limit || null;
    return this.limitsRepository.save(limit);
  }

}

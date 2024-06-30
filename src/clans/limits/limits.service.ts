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
    const limit = await this.limitsRepository.findOne({where: {id: limitId}, relations: ["group", "clan"]});
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
    await this.limitsRepository.remove(limit);
    limit.id = limitId;
    return limit;
  }

  async updateLimit(limitId: number, updateObj: UpdateLimitDto) {
    const limit = await this.getLimitById(limitId);
    limit.limit = updateObj.limit || null;
    await this.limitsRepository.save(limit);
    return limit;
  }

  async replaceLimits(clanId: number, limits: CreateLimitDto[]) {
    const clan = await this.clansService.getClanById(clanId);
    const existingLimits = await this.limitsRepository.find({where: {clan: {id: clan.id}}});
    await this.limitsRepository.remove(existingLimits);

    const groupIds = limits.map(limit => limit.group_id);
    const uniqueGroupIds = new Set(groupIds);
    if (groupIds.length !== uniqueGroupIds.size) {
      throw new BadRequestException("Group ids must be unique");
    }

    const newLimits = await Promise.all(limits.map(async limit => {
      const group = await this.permissionsService.getGroupById(limit.group_id);

      return this.limitsRepository.create({
        limit: limit.limit || null,
        clan: clan,
        group
      });
    }));
    return this.limitsRepository.save(newLimits);
  }

}

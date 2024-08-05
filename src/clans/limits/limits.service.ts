import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Limit } from "../entity/Limit.entity";
import { PermissionsService } from "../../permissions/permissions.service";
import { ListsService } from "../../lists/lists.service";
import { CreateLimitDto } from "../dtos/create-limit.dto";
import { ClansService } from "../clans.service";
import { UpdateLimitDto } from "../dtos/update-limit.dto";
import { User } from "../../users/entity/User.entity";
import { LoggerService } from "../../logger/logger.service";
import { LoggerEntity } from "../../logger/types/logger-request-body.interface";
import { LoggerLevel } from "../../logger/types/logger-level.enum";

@Injectable()
export class LimitsService {

  constructor(
    @InjectRepository(Limit) private limitsRepository: Repository<Limit>,
    private permissionsService: PermissionsService,
    private listsService: ListsService,
    private clansService: ClansService,
    private loggerService: LoggerService
  ) {}

  async getLimitsByClanId(clanId: number, user: User) {
    const clans = await this.clansService.getAvailableClans({user});

    if (!clans.some(clan => clan.id === clanId)) {
      throw new ForbiddenException("You do not have access to this clan");
    }

    return this.limitsRepository.find({where: { clan: {id: clanId} }, relations: ["group"]});
  }

  async getLimitById(limitId: number) {
    const limit = await this.limitsRepository.findOne({where: {id: limitId}, relations: ["group", "clan"]});
    if (!limit) {
      throw new BadRequestException("Limit does not exist");
    }
    return limit;
  }


  async createLimit(clanId: number, createObj: CreateLimitDto, user: User) {
    const limitToCreate = await this.createLimitEntity(clanId, createObj);

    const existingLimit = await this.limitsRepository.findOne({where: {clan: {id: limitToCreate.clan.id}, group: {id: limitToCreate.group.id}}});

    if (existingLimit) {
      throw new BadRequestException("Limit already exists");
    }

    this.loggerService.log({
      entity: LoggerEntity.Clan,
      level: LoggerLevel.CREATED,
      title: 'Clan Limit created',
      fields: [
        { name: 'Clan ID', value: limitToCreate.clan.id + '' },
        { name: 'Clan Name', value: limitToCreate.clan.name},
        { name: 'Group', value: limitToCreate.group.name + `(ID: ${limitToCreate.group.name})` },
        { name: 'Limit', value: (limitToCreate.limit || "Unlimited") + "" },
      ],
      user
    });

    return this.limitsRepository.save(limitToCreate);
  }

  async deleteLimit(limitId: number, user: User) {
    const limit = await this.getLimitById(limitId);
    await this.limitsRepository.remove(limit);
    limit.id = limitId;
    this.loggerService.log({
      entity: LoggerEntity.Clan,
      level: LoggerLevel.DELETED,
      title: 'Clan Limit deleted',
      fields: [
        { name: 'Clan ID', value: limit.clan.id + '' },
        { name: 'Clan Name', value: limit.clan.name},
        { name: 'Group', value: limit.group.name + `(ID: ${limit.group.name})` },
        { name: 'Limit', value: (limit.limit || "Unlimited") + "" },
      ],
      user
    });
    return limit;
  }

  async updateLimit(limitId: number, updateObj: UpdateLimitDto, user: User) {
    const limit = await this.getLimitById(limitId);
    limit.limit = updateObj.limit || null;
    await this.limitsRepository.save(limit);
    this.loggerService.log({
      entity: LoggerEntity.Clan,
      level: LoggerLevel.UPDATED,
      title: 'Clan Limit updated',
      fields: [
        { name: 'Clan ID', value: limit.clan.id + '' },
        { name: 'Clan Name', value: limit.clan.name},
        { name: 'Group', value: limit.group.name},
        { name: 'Limit [UPDATED]', value: (limit.limit || "Unlimited") + "" },
      ],
      user
    });
    return limit;
  }

  async replaceLimits(clanId: number, limits: CreateLimitDto[], user: User) {
    const clan = await this.clansService.getClanById(clanId);
    const existingLimits = await this.limitsRepository.find({where: {clan: {id: clan.id}}});
    await this.limitsRepository.remove(existingLimits);

    const groupIds = limits.map(limit => limit.group_id);
    const uniqueGroupIds = new Set(groupIds);
    if (groupIds.length !== uniqueGroupIds.size) {
      throw new BadRequestException("Group ids must be unique");
    }

    const newLimits = await Promise.all(limits.map(async limit => {
      return this.createLimitEntity(clanId, limit);
    }));

    this.loggerService.log({
      entity: LoggerEntity.Clan,
      level: LoggerLevel.UPDATED,
      title: 'Clan Limit updated',
      fields: [
        { name: 'Clan ID', value: clan.id + '' },
        { name: 'Clan Name', value: clan.name},
        { name: 'Limits', value: newLimits.map(limit => `${limit.group.name} -> ${limit.limit || "Unlimited"}`).join(`\n`)}
      ],
      user
    });

    return this.limitsRepository.save(newLimits);
  }

  private async createLimitEntity(clanId: number, createObj: CreateLimitDto) {
    if (createObj.limit && createObj.limit <= 0) throw new BadRequestException("Limit must be greater than 0");

    const group = await this.permissionsService.getGroupById(createObj.group_id);
    const clan = await this.clansService.getClanById(clanId);

    return this.limitsRepository.create({
      clan,
      group,
      limit: createObj.limit || null,
    });
  }

}

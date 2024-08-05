import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Record } from "./entity/Record.entity";
import { GetRecordsOptionsInterface } from "./interfaces/get-records-options.interface";
import { ClansService } from "../clans/clans.service";
import { AuthRoles } from "../auth/guards/auth.guard";
import { CreateRecordOptions } from "./interfaces/create-record-options.interface";
import { User } from "../users/entity/User.entity";

import { LoggerService } from "../logger/logger.service";
import { LoggerEntity } from "../logger/types/logger-request-body.interface";
import { LoggerLevel } from "../logger/types/logger-level.enum";

@Injectable()
export class RecordsService {

  constructor(
    @InjectRepository(Record) private recordsRepository: Repository<Record>,
    private clansService: ClansService,
    private loggerService: LoggerService
  ) {
  }


  async getRecords({ user, clanId, listId }: GetRecordsOptionsInterface) {
    const clan = await this.clansService.getClanById(clanId, ["allowed_lists", "clan_leaders"]);

    if (
      !clan.clan_leaders.find(leader => leader.id === user.id) &&
      ![AuthRoles.Admin, AuthRoles.Root].includes(user.permission)
    ) {
      throw new ForbiddenException("You do not have permission to view this clan's records");
    }


    if (!clan.allowed_lists.find(list => list.id === listId)) {
      throw new BadRequestException("Clan does not have access to this list");
    }

    const records = await this.recordsRepository.find({
      where: {
        list: { id: listId },
        clan: { id: clanId }
      },
      relations: ["group", "clan", "author"]
    });

    return records.map(record => ({
      ...record,
      author: {
        id: record.author.id,
        username: record.author.username
      },
    }));
  }

  async createRecord(
    { user, clanId, listId, username, group_id, steam_id, expire_date }: CreateRecordOptions
  ) {
    const clan = await this.clansService.getClanById(clanId, ["allowed_lists", "clan_leaders", "limits", "limits.group"]);

    const isAdmin = [AuthRoles.Admin, AuthRoles.Root].includes(user.permission);
    const isClanLeader = clan.clan_leaders.find(leader => leader.id === user.id);
    if ( !isClanLeader && !isAdmin ) {
      throw new ForbiddenException("You do not have permission to create records for this clan");
    }

    const list = clan.allowed_lists.find(list => list.id === listId);
    if (!list) {
      throw new BadRequestException("Clan does not have access to this list");
    }

    const limit = clan.limits.find(limit => limit.group.id === group_id);
    if (!limit) {
      throw new ForbiddenException("Clan does not have access to this group");
    }

    const recordsCount = await this.recordsRepository.countBy(
      {
        clan: { id: clanId },
        list: { id: listId },
        group: { id: group_id }
      }
    );

    if (limit.limit && limit.limit <= recordsCount) {
      throw new ForbiddenException("Clan has reached the limit for this group");
    }
    const record = this.recordsRepository.create({
      clan: { id: clanId, name: clan.name },
      list: { id: listId, name: list.name },
      group: { id: group_id, name: limit.group.name },
      username,
      steam_id,
      expire_date: expire_date || null,
      author: user
    });

    const response = await this.recordsRepository.save(record);

    this.loggerService.log({
      entity: LoggerEntity.Record,
      level: LoggerLevel.CREATED,
      title: "Record created",
      fields: [
        { name: 'Record ID', value: record.id + "" },
        { name: 'User name', value: username },
        { name: 'Steam ID', value: steam_id + "" },
        { name: 'Clan', value: `${clan.name} (ID: ${clan.id})` },
        { name: 'List', value: `${list.name} (ID: ${list.id})` },
        { name: 'Group', value: `${limit.group.name} (ID: ${limit.group.id})` },
        { name: 'Expire date', value: expire_date + "" },
      ],
      user
    });

    return response;
  }

  async getRecordsByListPath(listPath: string){
    return this.recordsRepository.find({
      where: {
        list: { path: listPath }
      },
      order: {
        clan: {
          create_date: "DESC"
        }
      },
      relations: ["group", "clan"]
    });
  }

  async deleteRecord(recordId: number, user: User) {
    const record = await this.recordsRepository.findOne({ where: { id: recordId }, relations: ["clan", "clan.clan_leaders"] });
    if (!record) {
      throw new BadRequestException("Record not found");
    }

    const clan = record.clan;

    const isAdmin = [AuthRoles.Admin, AuthRoles.Root].includes(user.permission);
    const isClanLeader = clan.clan_leaders.find(leader => leader.id === user.id);
    if ( !isClanLeader && !isAdmin ) {
      throw new ForbiddenException("You do not have permission to delete records for this clan");
    }

    await this.recordsRepository.remove(record);

    this.loggerService.log({
      entity: LoggerEntity.Record,
      level: LoggerLevel.DELETED,
      title: "Record deleted",
      fields: [
        { name: 'Record ID', value: recordId + "" },
        { name: 'Record username', value: record.username },
        { name: 'Record steam ID', value: record.steam_id + "" },
        { name: 'Clan', value: `${clan.name} (ID: ${clan.id})` },
      ],
      user
    });

    return {...record, id: recordId}
  }

  async deleteExpiredRecords() {
    const currentDate = new Date();

    return await this.recordsRepository
      .createQueryBuilder()
      .delete()
      .from(Record)
      .where("expire_date <= :currentDate", { currentDate: currentDate })
      .execute();
  }

  private async getRecordsBySteamId(steamId: string) {
    return this.recordsRepository.find({
      where: {
        steam_id: steamId
      },
      relations: ["group"]
    });
  };

  async getCurrentUserRecords(user: User) {
    return this.getRecordsBySteamId(user.steam_id);
  }

}

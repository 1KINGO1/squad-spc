import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Record } from "./entity/Record.entity";
import { GetRecordsOptionsInterface } from "./interfaces/get-records-options.interface";
import { ClansService } from "../clans/clans.service";
import { AuthRoles } from "../auth/guards/auth.guard";
import { CreateRecordOptions } from "./interfaces/create-record-options.interface";
import { User } from "../users/entity/User.entity";

@Injectable()
export class RecordsService {

  constructor(
    @InjectRepository(Record) private recordsRepository: Repository<Record>,
    private clansService: ClansService
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

    return this.recordsRepository.find({
      where: {
        list: { id: listId },
        clan: { id: clanId }
      },
      relations: ["group", "clan"]
    });
  }

  async createRecord(
    { user, clanId, listId, username, groupId, steam_id, expire_date }: CreateRecordOptions
  ) {
    const clan = await this.clansService.getClanById(clanId, ["allowed_lists", "clan_leaders", "limits", "limits.group"]);

    const isAdmin = [AuthRoles.Admin, AuthRoles.Root].includes(user.permission);
    const isClanLeader = clan.clan_leaders.find(leader => leader.id === user.id);
    if ( !isClanLeader && !isAdmin ) {
      throw new ForbiddenException("You do not have permission to create records for this clan");
    }

    if (!clan.allowed_lists.find(list => list.id === listId)) {
      throw new BadRequestException("Clan does not have access to this list");
    }

    const limit = clan.limits.find(limit => limit.group.id === groupId);

    if (!limit) {
      throw new ForbiddenException("Clan does not have access to this group");
    }

    const recordsCount = await this.recordsRepository.countBy(
      {
        clan: { id: clanId },
        list: { id: listId },
        group: { id: groupId }
      }
    );

    if (limit.limit <= recordsCount) {
      throw new ForbiddenException("Clan has reached the limit for this group");
    }

    const record = this.recordsRepository.create({
      clan: { id: clanId },
      list: { id: listId },
      group: { id: groupId },
      username,
      steam_id,
      expire_date: expire_date || null,
      author: user
    });

    return this.recordsRepository.save(record);
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
    return record;
  }

}

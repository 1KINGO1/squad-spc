import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Clan } from "./entity/Clan.entity";
import { AuthRoles } from "../auth/guards/auth.guard";
import { User } from "../users/entity/User.entity";
import { CreateClanDto } from "./dtos/create-clan.dto";
import { PermissionsService } from "../permissions/permissions.service";
import { ListsService } from "../lists/lists.service";
import { Limit } from "./entity/Limit.entity";
import { UpdateClanDto } from "./dtos/update-clan.dto";

interface GetAvailableClansOptions {
  user: User;
  limit?: number;
  listId?: number;
  offset?: number;
  include?: ("clan_leaders" | "allowed_lists" | "limits")[];
}

@Injectable()
export class ClansService {
  constructor(
    @InjectRepository(Clan) private clansRepository: Repository<Clan>,
    private listsService: ListsService
  ) {
  }

  async getAvailableClans({ user, limit, offset, include, listId }: GetAvailableClansOptions) {
    if (Number.isNaN(limit) || limit <= 0 || limit >= 30) {
      limit = 30;
    }

    if (Number.isNaN(offset) || offset <= 0) {
      offset = 0;
    }

    let allClans = await this.clansRepository.find(
      {
        where: listId ? { allowed_lists: { id: listId } } : {},
        relations: include,
        take: limit,
        skip: offset
      }
    );

    if ([AuthRoles.Admin, AuthRoles.Root].includes(user.permission)) {
      return allClans;
    }

    // Return clans where the user is a clan leader
    return allClans
      .filter(clan =>
        clan.clan_leaders.some(
          leader => leader.steam_id === user.steam_id
        )
      );
  }

  async getClansByIds(id: number[]) {
    return this.clansRepository.findBy({ id: In(id) });
  }

  async createClan(createClanDto: CreateClanDto) {
    const lists = await this.listsService.getListsByIds(createClanDto.allowed_lists);

    if (lists.length === 0) {
      throw new BadRequestException("No lists found with the provided ids");
    }

    const clan = this.clansRepository.create(
      {
        name: createClanDto.name,
        tag: createClanDto.tag,
        allowed_lists: lists,
        limits: []
      }
    );

    return await this.clansRepository.save(clan);
  }

  async getClanById(id: number, relations?: string[]) {
    const clan = await this.clansRepository.findOne({ where: {id}, relations});
    if (!clan) {
      throw new BadRequestException("No clan found with the provided id");
    }
    return clan;
  }

  async deleteClan(id: number) {
    const clan = await this.getClanById(id);
    await this.clansRepository.remove(clan);
    return clan;
  }

  async updateClan(id: number, updateClanDto: UpdateClanDto) {
    const clan = await this.getClanById(id);

    if (updateClanDto?.allowed_lists) {
      const lists = await this.listsService.getListsByIds(updateClanDto.allowed_lists);
      if (lists.length === 0) {
        throw new BadRequestException("No lists found with the provided ids");
      }
      clan.allowed_lists = lists;
    }

    if (updateClanDto?.name) {
      clan.name = updateClanDto.name;
    }

    if (updateClanDto?.tag) {
      clan.tag = updateClanDto.tag;
    }

    return await this.clansRepository.save(clan);
  }
}

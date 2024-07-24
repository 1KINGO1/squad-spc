import { BadRequestException, forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Clan } from "./entity/Clan.entity";
import { AuthRoles } from "../auth/guards/auth.guard";
import { User } from "../users/entity/User.entity";
import { CreateClanDto } from "./dtos/create-clan.dto";
import { ListsService } from "../lists/lists.service";
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
    @Inject(forwardRef(() => ListsService))
    private listsService: ListsService
  ) {
  }

  async getAvailableClans({ user, limit, offset, include = [], listId }: GetAvailableClansOptions) {
    if (Number.isNaN(limit) || limit <= 0) {
      limit = 100;
    }

    if (Number.isNaN(offset) || offset <= 0) {
      offset = 0;
    }

    let allClans = await this.clansRepository.find(
      {
        where: listId !== undefined ? { allowed_lists: { id: listId } } : {},
        relations: ["clan_leaders", ...include],
        take: limit,
        skip: offset
      }
    );

    if ([AuthRoles.Admin, AuthRoles.Root].includes(user.permission)) {
      return allClans.map(clan => {
        if (!include?.includes("clan_leaders")) {
          delete clan.clan_leaders;
        }
        return clan;
      });
    }

    // Return clans where the user is a clan leader
    return allClans
      .filter(clan =>
        clan.clan_leaders.some(
          leader => leader.steam_id === user.steam_id
        )
      )
      .map(clan => {
        if (!include?.includes("clan_leaders")) {
          delete clan.clan_leaders;
        }
        return clan;
      });
  }

  async getClansByIds(id: number[]) {
    return this.clansRepository.findBy({ id: In(id) });
  }

  async createClan(createClanDto: CreateClanDto) {
    const lists = await this.listsService.getListsByIds(createClanDto.allowed_lists);

    if (lists.length === 0) {
      throw new BadRequestException("No lists found with the provided ids");
    }

    let clan = this.clansRepository.create(
      {
        name: createClanDto.name,
        tag: createClanDto.tag,
        allowed_lists: lists,
        limits: []
      }
    );

    clan = await this.clansRepository.save(clan);

    return {
      clan_leaders: [],
      ...clan
    }
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
    clan.id = id;
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

import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { List } from "./entity/List.entity";
import { UpdateListDto } from "./dtos/update-list.dto";
import { CreateListDto } from "./dtos/create-list.dto";
import { ClansService } from "../clans/clans.service";
import { User } from "../users/entity/User.entity";
import { AuthRoles } from "../auth/guards/auth.guard";
import { LoggerService } from "../logger/logger.service";
import { LoggerEntity } from "../logger/types/logger-request-body.interface";
import { LoggerLevel } from "../logger/types/logger-level.enum";

@Injectable()
export class ListsService {

  constructor(
    @InjectRepository(List) private listsRepository: Repository<List>,
    @Inject(forwardRef(() => ClansService))
    private clansService: ClansService,
    private loggerService: LoggerService
  ) {
  }

  async create(createListDto: CreateListDto, user: User) {

    await this.checkAvailability(createListDto);

    try {
      const list = this.listsRepository.create(createListDto);
      const response = await this.listsRepository.save(list);

      this.loggerService.log({
        entity: LoggerEntity.List,
        level: LoggerLevel.CREATED,
        title: "List created",
        fields: [
          { name: 'List ID', value: list.id + "" },
          { name: 'Name', value: list.name },
          { name: 'Path', value: list.path },
        ],
        user
      });

      return response;
    } catch (e) {
      throw new BadRequestException("Something went wrong!");
    }
  }

  async getAll(user: User) {

    const lists = await this.listsRepository.findBy({});

    if ([AuthRoles.Admin, AuthRoles.Root].includes(user.permission)) return lists;

    return (await Promise.all(lists.map(list => this.checkListAccessibility(list, user)))).filter(list => list);
  }

  async getById(id: number) {
    const list = await this.listsRepository.findOneBy({ id });
    if (!list) throw new NotFoundException("List with id " + id + " not found");

    return list;
  }

  async deleteById(id: number, user: User) {
    const list = await this.getById(id);
    if (!list) throw new NotFoundException();

    await this.listsRepository.delete(list);

    this.loggerService.log({
      entity: LoggerEntity.List,
      level: LoggerLevel.DELETED,
      title: "List deleted",
      fields: [
        { name: 'List ID', value: list.id + "" },
        { name: 'Name', value: list.name },
        { name: 'Path', value: list.path },
      ],
      user
    });

    return list;
  }

  async update(id: number, updateListDto: UpdateListDto, user: User) {
    const list = await this.getById(id);
    if (!list) throw new NotFoundException();

    await this.checkAvailability(updateListDto);

    this.loggerService.log({
      entity: LoggerEntity.List,
      level: LoggerLevel.UPDATED,
      title: "List updated",
      fields: [
        { name: 'List ID', value: list.id + "" },
        { name: 'Name', value: `${list.name}${updateListDto?.name ? ` -> ${updateListDto.name}` : ''}`},
        { name: 'Path', value: `${list.path}${updateListDto?.path ? ` -> ${updateListDto.path}` : ''}`},
      ],
      user
    });

    await this.listsRepository.update(list, updateListDto);

    return {...list, ...updateListDto};
  }

  async getListsByIds(id: number[]) {
    return this.listsRepository.findBy({ id: In(id) });
  }

  async getListClans(id: number, user: User) {
    return this.clansService.getAvailableClans({
      user,
      listId: id
    });
  }

  private async checkAvailability(updateListDto: UpdateListDto) {
    if (updateListDto?.name) {
      let list = await this.listsRepository.findOneBy({ name: updateListDto.name });
      if (list) throw new BadRequestException("List with this name already exist");
    }
    if (updateListDto?.path) {
      let list = await this.listsRepository.findOneBy({ path: updateListDto.path });
      if (list) throw new BadRequestException("List with this path already exist");
    }
  }

  private async checkListAccessibility(list: List, user: User): Promise<List | false> {
    if ([AuthRoles.Admin, AuthRoles.Root].includes(user.permission)) return list;

    const listWithRelations = await this.listsRepository.findOne(
      {
        where: { id: list.id },
        relations: ["clans.clan_leaders"]
      }
    );

    const isAccessible = listWithRelations.clans.some(clan => clan.clan_leaders.some(clanLeader => clanLeader.id === user.id));

    return isAccessible ? list : false;
  }
}

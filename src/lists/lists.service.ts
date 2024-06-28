import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { List } from "./entity/List.entity";
import { UpdateListDto } from "./dtos/update-list.dto";
import { CreateListDto } from "./dtos/create-list.dto";
import { ClansService } from "../clans/clans.service";
import { User } from "../users/entity/User.entity";

@Injectable()
export class ListsService {

  constructor(
    @InjectRepository(List) private listsRepository: Repository<List>,
    @Inject(forwardRef(() => ClansService))
    private clansService: ClansService
  ) {}

  async create(createListDto: CreateListDto) {

    await this.checkAvailability(createListDto);

    try {
      const list = this.listsRepository.create(createListDto);
      return await this.listsRepository.save(list);
    } catch (e) {
      throw new BadRequestException("Something went wrong!");
    }
  }

  async getAll() {
    return this.listsRepository.findBy({});
  }

  async getById(id: number) {
    const list = await this.listsRepository.findOneBy({ id });
    if (!list) throw new NotFoundException("List with id " + id + " not found");

    return list;
  }

  async deleteById(id: number) {
    const list = await this.getById(id);
    if (!list) throw new NotFoundException();

    await this.listsRepository.delete(list);

    return list;
  }

  async update(id: number, updateListDto: UpdateListDto) {
    const list = await this.getById(id);
    if (!list) throw new NotFoundException();

    await this.checkAvailability(updateListDto);
    await this.listsRepository.update(list, updateListDto);

    return list;
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
}

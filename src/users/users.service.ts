import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/User.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { AuthRoles } from "../auth/guards/auth.guard";
import { ClansService } from "../clans/clans.service";
import { DatabaseSeedService } from "../database-seed/database-seed.service";

import logger from "../logger/logger";
import { LoggerLevel } from "../logger/types/logger-level.enum";

type createUserObj =
  Required<Pick<User, 'steam_id'>> &
  Required<Pick<User, 'username'>> &
  Required<Pick<User, 'avatar_url'>> &
  Partial<User>;

interface GetUsersOptions {
  limit?: number;
  offset?: number;
  orderBy?: 'ASC' | 'DESC';
  orderByField?: string;
}

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private clansService: ClansService,
    private databaseSeedService: DatabaseSeedService
  ) {}

  async create(creationObj: createUserObj){
    try {
      let user = this.usersRepository.create(creationObj);
      user = await this.usersRepository.save(user);


      if (user.id === 1) {
        user.permission = AuthRoles.Root;
        await this.databaseSeedService.seed();
        user = await this.usersRepository.save(user);
      }

      logger.log({
        level: LoggerLevel.CREATED,
        image_url: user.avatar_url,
        message: `Name: <b>${user.username}<b>\nSteamID: <b>${user.steam_id}<b>`,
        title: 'New User',
      })

      return user;
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Something went wrong');
    }
  }

  async getAll(options?: GetUsersOptions){
    let query = this.usersRepository.createQueryBuilder('users');

    if(options?.orderByField){
      query = query.orderBy(`users.${options.orderByField}`, options.orderBy);
    }

    if(options?.limit){
      query = query.limit(options.limit);
    }

    if(options?.offset){
      query = query.offset(options.offset);
    }

    return query.getMany();
  }

  async findById(id: number){
    const user = await this.usersRepository.findOneBy({id});
    if(!user){
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findBySteamId(steam_id: string){
    return this.usersRepository.findOneBy({steam_id});
  }

  async update(id: number, user: User, updateObj: UpdateUserDto){

    if (user.id === id) {
      throw new ForbiddenException('You cannot update yourself');
    }

    const userToUpdate = await this.usersRepository.findOne({where: {id}});

    if(!userToUpdate){
      throw new BadRequestException('User not found');
    }

    if (updateObj?.permission !== undefined) {
      if (user.permission <= updateObj.permission) {
        throw new ForbiddenException('You cannot update a user with a higher permission level than yourself');
      }

      userToUpdate.permission = updateObj.permission;
    }
    if (updateObj?.clan_ids !== undefined) {
      userToUpdate.clans = await this.clansService.getClansByIds(updateObj.clan_ids);
    }
    await this.usersRepository.save(userToUpdate);

    return userToUpdate;
  }

  async deleteById(id: number, user: User){
    const userToDelete = await this.findById(id);

    if (user.id === id) {
      throw new ForbiddenException('You cannot delete yourself');
    }

    if (userToDelete.permission === AuthRoles.Root) {
      throw new ForbiddenException('You cannot delete root user');
    }

    await this.usersRepository.remove(userToDelete);
    return userToDelete;
  }
}

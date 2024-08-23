import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Group } from "./entity/Group.entity";
import { Permission } from "./entity/Permission.entity";
import { CreatePermissionDto } from "./dtos/create-permission.dto";
import { CreateGroupDto } from "./dtos/create-group.dto";
import { UpdateGroupDto } from "./dtos/update-group.dto";
import { User } from "../users/entity/User.entity";
import { LoggerService } from "../logger/logger.service";
import { LoggerEntity } from "../logger/types/logger-request-body.interface";
import { LoggerLevel } from "../logger/types/logger-level.enum";

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Group) private groupsRepository: Repository<Group>,
    @InjectRepository(Permission) private permissionsRepository: Repository<Permission>,
    private loggerService: LoggerService
  ) {
  }

  async getGroupsWithPermissions() {
    return await this.groupsRepository.find({
      relations: {
        permissions: true
      }
    });
  }

  /* ========================================================= */

  async getGroups() {
    return await this.groupsRepository.find({ relations: ['permissions']});
  }

  async getGroupById(id: number) {
    const group = await this.groupsRepository.findOneBy({id});
    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }
    return group;
  }

  async deleteGroup(id: number, user: User) {
    const group = await this.groupsRepository.findOneBy({id});
    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }
    await this.groupsRepository.remove(group);
    group.id = id;

    this.loggerService.log({
      entity: LoggerEntity.Permission,
      level: LoggerLevel.DELETED,
      title: "Group deleted",
      fields: [
        { name: 'Group ID', value: group.id + "" },
        { name: 'Name', value: group.name },
      ],
      user
    });

    return group;
  }

  async createGroup(createGroupDto: CreateGroupDto, user: User) {
    await this.checkIfGroupExists(createGroupDto.name);
    const group = this.groupsRepository.create({ name: createGroupDto.name });
    group.permissions = await this.permissionsRepository.find(
      { where: createGroupDto.permissions.map(id => ({ id })) }
    );
    const response = await this.groupsRepository.save(group);

    this.loggerService.log({
      entity: LoggerEntity.Permission,
      level: LoggerLevel.CREATED,
      title: "Group created",
      fields: [
        { name: 'Group ID', value: group.id + "" },
        { name: 'Name', value: group.name },
        { name: 'Permissions', value: group.permissions.map(p => p.name).join(', ') },
      ],
      user
    });

    return response;
  }

  async updateGroup(id: number, updateGroupDto: UpdateGroupDto, user: User) {
    const group = await this.groupsRepository.findOne({where: {id}, relations: ['permissions']});
    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }

    const prevName = group.name;
    const prevPermissions = group.permissions.map(p => p.name);

    if (updateGroupDto?.name) {
      await this.checkIfGroupExists(updateGroupDto.name);
      group.name = updateGroupDto?.name;
    }
    if (updateGroupDto?.permissions) {
      group.permissions = await this.permissionsRepository.find(
        { where: updateGroupDto.permissions.map(id => ({ id })) }
      );
    }

    this.loggerService.log({
      entity: LoggerEntity.Permission,
      level: LoggerLevel.UPDATED,
      title: "Group updated",
      fields: [
        { name: 'Group ID', value: group.id + "" },
        { name: 'Name', value: prevName + (updateGroupDto?.name ? ` -> ${updateGroupDto.name}` : '' )},
        { name: 'Permissions', value: prevPermissions.join(', ')},
        updateGroupDto?.permissions?.length ? { name: 'Updated permissions', value: group.permissions.map(p => p.name).join(', ') } : undefined,
      ],
      user
    });

    await this.groupsRepository.save(group);
    return group;
  }

  async checkIfGroupExists(name: string) {
    const group = await this.groupsRepository.findOneBy({ name });
    if (group) {
      throw new BadRequestException(`Group with name ${name} already exists`);
    }
    return group;
  }

  async getGroupsByIds(ids: number[]) {
    return this.groupsRepository.findBy({id: In(ids)});
  }

  /* ========================================================= */

  async createPermission(createPermissionDto: CreatePermissionDto) {
    const permission = this.permissionsRepository.create(createPermissionDto);
    return this.permissionsRepository.save(permission);
  }

  async getPermissions() {
    return await this.permissionsRepository.find();
  }

  async deletePermission(id: number) {
    const permission = await this.permissionsRepository.findOneBy({ id });
    if (!permission) {
      throw new NotFoundException(`Permission with id ${id} not found`);
    }
    return this.permissionsRepository.remove(permission);
  }

  async getPermissionsByIds(ids: number[]) {
    return this.permissionsRepository.findBy({id: In(ids)});
  }
}

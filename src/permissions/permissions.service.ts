import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Group } from "./entity/Group.entity";
import { Permission } from "./entity/Permission.entity";
import { CreatePermissionDto } from "./dtos/create-permission.dto";
import { CreateGroupDto } from "./dtos/create-group.dto";
import { UpdateGroupDto } from "./dtos/update-group.dto";

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Group) private groupsRepository: Repository<Group>,
    @InjectRepository(Permission) private permissionsRepository: Repository<Permission>
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

  async deleteGroup(id: number) {
    const group = await this.groupsRepository.findOneBy({id});
    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }
    await this.groupsRepository.remove(group);
    group.id = id;
    return group;
  }

  async createGroup(createGroupDto: CreateGroupDto) {
    await this.checkIfGroupExists(createGroupDto.name);
    const group = this.groupsRepository.create({ name: createGroupDto.name });
    group.permissions = await this.permissionsRepository.find(
      { where: createGroupDto.permissions.map(id => ({ id })) }
    );
    return this.groupsRepository.save(group);
  }

  async updateGroup(id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.groupsRepository.findOneBy({id});
    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }
    if (updateGroupDto?.name) {
      await this.checkIfGroupExists(updateGroupDto.name);
      group.name = updateGroupDto?.name;
    }
    if (updateGroupDto?.permissions) {
      group.permissions = await this.permissionsRepository.find(
        { where: updateGroupDto.permissions.map(id => ({ id })) }
      );
    }
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

}

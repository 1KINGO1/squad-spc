import { Test } from "@nestjs/testing";
import { ConfigService } from "./config.service";
import { IConfigSettings } from "./data/config.settings";
import { AuthRoles } from "../auth/guards/auth.guard";
import { User } from "../users/entity/User.entity";
import { BadRequestException, ForbiddenException } from "@nestjs/common";
import * as fs from "fs/promises";

describe('ConfigService', () => {
  const configSettings: IConfigSettings = {
    "exampleProperty": {
      get: [AuthRoles.Admin, AuthRoles.Root],
      set: [AuthRoles.Root],
      type: "string",
      name: "exampleProperty",
      comment: "example comment",
    }
  }
  let service: ConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: 'CONFIG_SETTINGS',
          useValue: configSettings
        },
        {
          provide: 'CONFIG_SAVE_PATH',
          useValue: 'config.test.json'
        }
      ]
    }).compile();

    service = module.get(ConfigService);
    await service.onModuleInit();
  });

  afterEach(async () => {
    await fs.rm('config.test.json');
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('throws error when user with an unenabled role access property', async () => {
    const user: User = {
      permission: AuthRoles.Guest
    } as User;

    const property = 'exampleProperty';
    expect(() => service.getOne(property, user)).toThrow(ForbiddenException);
  });
  it('throws error when user access property doesn\'t exist', async () => {
    const user: User = {
      permission: AuthRoles.Root
    } as User;

    const property = 'unexistingProperty';
    expect(() => service.getOne(property, user)).toThrow(Error);
  });
  it('throws error when user with an unenabled role sets property', async () => {
    const user: User = {
      permission: AuthRoles.Admin
    } as User;

    const property = 'exampleProperty';
    const valueToSet = "newValue";
    await expect(() => service.set(property, valueToSet, user)).rejects.toThrow(ForbiddenException);
  });
  it('should set property', async () => {
    const user: User = {
      permission: AuthRoles.Root
    } as User;

    const property = 'exampleProperty';
    const valueToSet = "newValue";
    await service.set(property, valueToSet, user);
    expect(service.get(property)).toBe(valueToSet);
  });
  it('throws error on incorrect set property type', async () => {
    const user: User = {
      permission: AuthRoles.Root
    } as User;

    const property = 'exampleProperty';
    let valueToSet: any = ["newValue"];
    await expect(() => service.set(property, valueToSet, user)).rejects.toThrow(BadRequestException);

    valueToSet = 123;
    await expect(() => service.set(property, valueToSet, user)).rejects.toThrow(BadRequestException);

    valueToSet = true;
    await expect(() => service.set(property, valueToSet, user)).rejects.toThrow(BadRequestException);

    valueToSet = { key: "value" };
    await expect(() => service.set(property, valueToSet, user)).rejects.toThrow(BadRequestException);
  });
});
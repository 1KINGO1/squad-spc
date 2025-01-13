import { UsersService } from "./users.service";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entity/User.entity";
import { ClansService } from "../clans/clans.service";
import { LoggerService } from "../logger/logger.service";
import { DatabaseSeedService } from "../database-seed/database-seed.service";
import { AuthRoles } from "../auth/guards/auth.guard";
import { BadRequestException, ForbiddenException, NotFoundException } from "@nestjs/common";

describe("UsersService", () => {
  let service: UsersService;
  let mockUsersRepository;
  let mockClanService;
  let mockDatabaseSeedService;
  let mockLoggerService;

  beforeEach(async () => {
    const usersRepository = {
      find: jest.fn(),
      findBy: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn()
    };
    const clanService = {};
    const databaseSeedService = {
      seed: jest.fn()
    };
    const loggerService = {
      log: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository
        },
        {
          provide: ClansService,
          useValue: clanService
        },
        {
          provide: DatabaseSeedService,
          useValue: databaseSeedService
        },
        {
          provide: LoggerService,
          useValue: loggerService
        }
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
    mockUsersRepository = module.get(getRepositoryToken(User));
    mockClanService = module.get(ClansService);
    mockDatabaseSeedService = module.get(DatabaseSeedService);
    mockLoggerService = module.get(LoggerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should create a user and log", async () => {
    const createUserObj = {
      steam_id: "123",
      username: "test",
      avatar_url: "test"
    };

    const id = 2;

    mockUsersRepository.create.mockReturnValue(createUserObj);
    mockUsersRepository.save.mockResolvedValue({...createUserObj, id});

    const result = await service.create(createUserObj);

    expect(result.id).toBe(id);
    expect(result.username).toBe(createUserObj.username);
    expect(result.steam_id).toBe(createUserObj.steam_id);
    expect(result.avatar_url).toBe(createUserObj.avatar_url);

    expect(mockUsersRepository.save).toHaveBeenCalled();
    expect(mockLoggerService.log).toHaveBeenCalled();
    expect(mockDatabaseSeedService.seed).not.toHaveBeenCalled();
  });
  it("should seed database & give user Root permission if user id is 1", async () => {
    const createUserObj = {
      steam_id: "123",
      username: "test",
      avatar_url: "test"
    };

    const id = 1;

    mockUsersRepository.create.mockReturnValue(createUserObj);
    mockUsersRepository.save.mockResolvedValue({...createUserObj, id});

    const result = await service.create(createUserObj);

    expect(result.id).toBe(id);
    expect(result.permission).toBe(AuthRoles.Root);
    expect(mockDatabaseSeedService.seed).toHaveBeenCalled();
  });
  it("shouldn't update yourself", async () => {
    const user: User = {
      id: 1,
      username: "test",
      steam_id: "123",
      avatar_url: "test"
    } as any as User;

    await expect(service.update(user.id, user, { permission: AuthRoles.ClanLeader })).rejects.toThrow(ForbiddenException);
  });
  it("shouldn't update inexisting user", async () => {
    const user: User = {
      id: 1,
      username: "test",
      steam_id: "123",
      avatar_url: "test"
    } as any as User;

    const someId = 123;
    mockUsersRepository.findOne.mockResolvedValue(null);

    await expect(service.update(someId, user, { permission: AuthRoles.ClanLeader })).rejects.toThrow(BadRequestException);
  });
  it("shouldn't update user that has higher permission level than yourself", async () => {
    const executingUser: User = {
      id: 1,
      username: "test",
      steam_id: "123",
      avatar_url: "test",
      permission: AuthRoles.Admin
    } as any as User;

    const user: User = {
      id: 2,
      username: "test",
      steam_id: "123",
      avatar_url: "test",
      permission: AuthRoles.Root
    } as any as User;


    mockUsersRepository.findOne.mockResolvedValue(user);
    await expect(service.update(user.id, executingUser, { permission: AuthRoles.ClanLeader })).rejects.toThrow(ForbiddenException);
  });
  it("shouldn't update user with higher permission level than yourself", async () => {
    const executingUser: User = {
      id: 1,
      username: "test",
      steam_id: "123",
      avatar_url: "test",
      permission: AuthRoles.Admin
    } as any as User;

    const user: User = {
      id: 2,
      username: "test",
      steam_id: "123",
      avatar_url: "test",
      permission: AuthRoles.Admin
    } as any as User;


    mockUsersRepository.findOne.mockResolvedValue(user);
    await expect(service.update(user.id, executingUser, { permission: AuthRoles.Root })).rejects.toThrow(ForbiddenException);
  });
  it("should update user permission and log", async () => {
    const executingUser: User = {
      id: 1,
      username: "test",
      steam_id: "123",
      avatar_url: "test",
      permission: AuthRoles.Admin
    } as any as User;

    const user: User = {
      id: 2,
      username: "test",
      steam_id: "123",
      avatar_url: "test",
      permission: AuthRoles.Guest
    } as any as User;


    mockUsersRepository.findOne.mockResolvedValue(user);
    mockUsersRepository.save.mockResolvedValue(user);
    const res = await service.update(user.id, executingUser, { permission: AuthRoles.ClanLeader });
    expect(res.id).toBe(user.id);
    expect(user.permission).toBe(AuthRoles.ClanLeader);

    expect(mockUsersRepository.save).toHaveBeenCalled();
    expect(mockLoggerService.log).toHaveBeenCalled();
  });
  it("shouldn't delete yourself", async () => {
    const user: User = {
      id: 1,
      username: "test",
      steam_id: "123",
      avatar_url: "test"
    } as any as User;

    mockUsersRepository.findOneBy.mockResolvedValue(user);
    await expect(service.deleteById(user.id, user)).rejects.toThrow(ForbiddenException);
  });
  it("shouldn't delete a user with higher or equal permission than you", async () => {
    const executingUser: User = {
      id: 1,
      username: "test",
      steam_id: "123",
      avatar_url: "test",
      permission: AuthRoles.Admin
    } as any as User;

    const user: User = {
      id: 2,
      username: "test",
      steam_id: "123",
      avatar_url: "test",
      permission: AuthRoles.Root
    } as any as User;

    mockUsersRepository.findOneBy.mockResolvedValue(user);
    await expect(service.deleteById(user.id, executingUser)).rejects.toThrow(ForbiddenException);
  });
  it("should delete user and log", async () => {
    const executingUser: User = {
      id: 1,
      username: "test",
      steam_id: "123",
      avatar_url: "test",
      permission: AuthRoles.Admin
    } as any as User;

    const user: User = {
      id: 2,
      username: "test",
      steam_id: "123",
      avatar_url: "test",
      permission: AuthRoles.Guest
    } as any as User;

    mockUsersRepository.findOneBy.mockResolvedValue(user);
    await service.deleteById(user.id, executingUser);
    expect(mockUsersRepository.remove).toHaveBeenCalled();
  });
});

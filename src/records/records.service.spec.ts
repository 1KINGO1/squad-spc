import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { RecordsService } from "./records.service";
import { Record } from "./entity/Record.entity";
import { ClansService } from "../clans/clans.service";
import { User } from "../users/entity/User.entity";
import { AuthRoles } from "../auth/guards/auth.guard";
import { BadRequestException, ForbiddenException } from "@nestjs/common";
import { LoggerService } from "../logger/logger.service";
import { List } from "../lists/entity/List.entity";
import { Group } from "../permissions/entity/Group.entity";
import { Clan } from "../clans/entity/Clan.entity";
import { Limit } from "../clans/entity/Limit.entity";

describe('RecordsService', () => {

  let service: RecordsService;
  let mockRecordsRepository;
  let mockClansService;
  let mockLoggerService;

  let testUser: User;
  let testList: List;
  let testGroup: Group;
  let testClan: Clan;

  beforeEach(async () => {
    mockRecordsRepository = {
      find: jest.fn(),
      findBy: jest.fn(),
      create: jest.fn(),
      countBy: jest.fn(),
      save: jest.fn()
    };
    mockClansService = {
      getClanById: jest.fn()
    }
    mockLoggerService = {
      log: jest.fn(),
    }

    testUser = {
      id: 1,
      permission: AuthRoles.Admin
    } as User;
    testList = {
      id: 1
    } as List;
    testGroup = {
      id: 1
    } as Group;
    testClan = {
      id: 1,
      clan_leaders: [
        testUser
      ],
      allowed_lists: [
        {
          id: testUser.id
        } as List
      ],
      limits: [
        {
          id: 1,
          group: testGroup,
          limit: 10
        } as Limit
      ]
    } as Clan;

    const module = await Test.createTestingModule({
      providers: [
        RecordsService,
        {
          provide: getRepositoryToken(Record),
          useValue: mockRecordsRepository
        },
        {
          provide: ClansService,
          useValue: mockClansService
        },
        {
          provide: LoggerService,
          useValue: mockLoggerService
        }
      ]
    }).compile();

    service = module.get(RecordsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create record', async () => {
    const username = "KINGO";
    const steam_id = "11111111111111111";
    const body = {
      user: testUser,
      clanId: testClan.id,
      listId: testList.id,
      username,
      group_id: testGroup.id,
      steam_id,
      expire_date: new Date()
    };

    mockClansService.getClanById.mockResolvedValue(testClan);
    mockRecordsRepository.countBy.mockResolvedValue(0);
    mockRecordsRepository.create.mockResolvedValue(body);
    mockRecordsRepository.save.mockResolvedValue({id: 1, ...body});

    await expect(service.createRecord(body)).resolves.toBeDefined();
    const result = await service.createRecord(body);
    expect(result.username).toBe(body.username);
    expect(result.steam_id).toBe(body.steam_id);
    expect(result.expire_date).toBeInstanceOf(Date);
  })
  it('throw error if user tries to create record when limit is reached', async () => {
    const username = "KINGO";
    const steam_id = "11111111111111111";
    const body = {
      user: testUser,
      clanId: testClan.id,
      listId: testList.id,
      username,
      group_id: testGroup.id,
      steam_id,
      expire_date: new Date()
    };

    mockClansService.getClanById.mockResolvedValue(testClan);
    mockRecordsRepository.countBy.mockResolvedValue(testClan.limits[0].limit);
    mockRecordsRepository.create.mockResolvedValue(body);
    mockRecordsRepository.save.mockResolvedValue({id: 1, ...body});

    await expect(service.createRecord(body)).rejects.toThrow(ForbiddenException);
  })
  it('clan leader can\'t access clans where he is not clan leader', async () => {
    const user: User = {
      id: 1,
      permission: AuthRoles.ClanLeader,
      clans: [{ id: 3 }]
    } as User;

    const records = [{ id: 1 }, { id: 2 }];

    mockClansService.getClanById.mockResolvedValue(
      {
        id: 2,
        clan_leaders: [{ id: 321312123 }],
        allowed_lists: [{ id: 1 }]
      }
    );

    mockRecordsRepository.find.mockResolvedValue(records);

    await expect(service.getRecords({ user, clanId: 2, listId: 1 })).rejects.toThrow(ForbiddenException);
  })
  it('throw error if clan doesn\'t have access to the list', async () => {
    const user: User = {
      id: 1,
      permission: AuthRoles.ClanLeader,
      clans: [{ id: 3 }]
    } as User;

    const records = [{ id: 1 }, { id: 2 }];

    mockClansService.getClanById.mockResolvedValue(
      {
        id: 2,
        clan_leaders: [{ id: 1 }],
        allowed_lists: [{ id: 1 }]
      }
    );

    mockRecordsRepository.find.mockResolvedValue(records);

    await expect(service.getRecords({ user, clanId: 2, listId: 4314325 })).rejects.toThrow(BadRequestException);
  })
});

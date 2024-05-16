import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { RecordsService } from "./records.service";
import { Record } from "./entity/Record.entity";
import { ClansService } from "../clans/clans.service";
import { User } from "../users/entity/User.entity";
import { AuthRoles } from "../auth/guards/auth.guard";
import { BadRequestException, ForbiddenException } from "@nestjs/common";

describe('RecordsService', () => {

  let service: RecordsService;
  let mockRecordsRepository;
  let mockClansService;

  beforeEach(async () => {
    mockRecordsRepository = {
      find: jest.fn(),
      findBy: jest.fn(),
      create: jest.fn()
    };
    mockClansService = {
      getClanById: jest.fn()
    }

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
        }
      ]
    }).compile();

    service = module.get(RecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

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
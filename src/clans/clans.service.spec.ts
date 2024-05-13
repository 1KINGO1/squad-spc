import { Test } from "@nestjs/testing";
import { ClansService } from "./clans.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Clan } from "./entity/Clan.entity";
import { ListsService } from "../lists/lists.service";
import { AuthRoles } from "../auth/guards/auth.guard";

describe('ClansService', () => {

  let mockClansRepository;
  let mockListService;

  let service: ClansService;

  beforeEach(async () => {
    mockClansRepository = {
      find: jest.fn(),
      findBy: jest.fn(),
      create: jest.fn()
    };

    mockListService = {
      getListById: jest.fn()
    };

    const module = await Test.createTestingModule({
      providers: [
        ClansService,
        {
          provide: getRepositoryToken(Clan),
          useValue: mockClansRepository
        },
        {
          provide: ListsService,
          useValue: mockListService
        }
      ]
    }).compile();

    service = module.get(ClansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all clans if user is admin', async () => {
    const user = { permission: AuthRoles.Admin };
    const allClans = [{ id: 1 }, { id: 2 }];

    mockClansRepository.find.mockResolvedValue(allClans);

    const result = await service.getAvailableClans({ user } as any);

    expect(result).toEqual(allClans);
  });

  it('should return only one clan where user is clanleader', async () => {
    const user = { permission: AuthRoles.ClanLeader, steam_id: '123' };
    const allClans = [
      { id: 1, clan_leaders: [{ steam_id: '123' }] },
      { id: 2, clan_leaders: [] }
    ];

    mockClansRepository.find.mockResolvedValue(allClans);

    const result = await service.getAvailableClans({ user } as any);

    expect(result).toEqual([allClans[0]]);
  });

  it('should return empty array if user is not clanleader somewhere', async () => {
    const user = { permission: AuthRoles.ClanLeader, steam_id: '123' };
    const allClans = [
      { id: 1, clan_leaders: [{ steam_id: '77777' }, { steam_id: '232' }] },
      { id: 2, clan_leaders: [{ steam_id: 'fsdfs132' }] }
    ];

    mockClansRepository.find.mockResolvedValue(allClans);

    const result = await service.getAvailableClans({ user } as any);

    expect(result).toEqual([]);
  });
});
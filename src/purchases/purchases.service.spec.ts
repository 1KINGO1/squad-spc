import { Test, TestingModule } from "@nestjs/testing";
import { PurchasesService } from "./purchases.service";
import { PaymentsService } from "../payments/payments.service";
import { ProductsService } from "../products/products.service";
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { Purchase } from "./entity/Purchase.entity";
import { User } from "../users/entity/User.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { ListsService } from "../lists/lists.service";

describe("PurchasesService", () => {
  let service: PurchasesService;

  let mockPaymentsService;
  let mockProductsService;
  let mockDataSource;
  let mockPurchasesRepository;
  let mockUserService;
  let mockListService;

  const products = [
    {
      id: 1,
      name: "test product",
      description: "test product description",
      list: { id: 1 },
      permissions: [
        { name: "reserve", value: "reserve", id: 1, create_date: new Date() }
      ],
      price: 100,
      shouldSale: true
    },
    {
      id: 2,
      name: "test product 2",
      description: "test product description 2",
      list: { id: 1 },
      permissions: [
        { name: "reserve", value: "reserve", id: 1, create_date: new Date() }
      ],
      price: 250,
      shouldSale: false
    }
  ];

  beforeEach(async () => {
    const paymentsService = {
      getOrCreateBalance: jest.fn()
    };
    const productsService = {
      getById: jest.fn()
    };
    const userService = {
      findBySteamId: jest.fn()
    };
    const dataSource = {
      transaction: jest.fn()
    };
    const purchasesRepository = {
      find: jest.fn(),
      findBy: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn()
    };
    const listsService = {
      getById: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchasesService,
        {
          provide: PaymentsService,
          useValue: paymentsService
        },
        {
          provide: ProductsService,
          useValue: productsService
        },
        {
          provide: getDataSourceToken(),
          useValue: dataSource
        },
        {
          provide: getRepositoryToken(Purchase),
          useValue: purchasesRepository
        },
        {
          provide: UsersService,
          useValue: userService
        },
        {
          provide: ListsService,
          useValue: listsService
        }
      ]
    }).compile();

    service = module.get<PurchasesService>(PurchasesService);
    mockPaymentsService = module.get(PaymentsService);
    mockProductsService = module.get(ProductsService);
    mockDataSource = module.get(getDataSourceToken());
    mockPurchasesRepository = module.get(getRepositoryToken(Purchase));
    mockUserService = module.get(UsersService);
    mockListService = module.get(ListsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should create a purchase", async () => {
    const productId = 1;
    const productPrice = 100;
    const desiredPrice = 100;
    const user = {
      steam_id: 1,
      username: "test"
    };
    const product = products[0];
    const userBalance = {
      balance: productPrice
    };
    const userPurchases = [];

    const saveMock = jest.fn().mockImplementation(async (entity, record) => {
      userPurchases.push(record);
    });
    const updateMock = jest.fn().mockImplementation((_, _1, updateField) => {
      userBalance.balance = updateField?.balance;
    });

    mockDataSource.transaction = jest.fn().mockImplementation(async (isolationLevel, work) => {
      const entityManager = {
        save: saveMock,
        update: updateMock
      } as unknown as EntityManager;
      return await work(entityManager);
    });
    mockPaymentsService.getOrCreateBalance.mockReturnValueOnce(userBalance);
    mockProductsService.getById.mockReturnValueOnce(product);
    mockPurchasesRepository.find.mockReturnValueOnce(userPurchases);

    await service.createPurchase(productId, desiredPrice, user as any as User);

    expect(userBalance.balance).toBe(0);
    expect(userPurchases.length).toBe(1);
  });
  it("throw error if product price != desired price", async () => {
    const user = {
      steam_id: 1,
      username: "test"
    };
    const product = products[0];
    const desiredPrice = product.price - 50;

    mockProductsService.getById.mockReturnValueOnce(product);

    await expect(service.createPurchase(product.id, desiredPrice, user as any as User)).rejects.toThrowError(BadRequestException);
  });
  it("throw error if product is not for sale or dont exist", async () => {
    const user = {
      steam_id: 1,
      username: "test"
    };
    const product = products[1];
    const desiredPrice = product.price;

    mockProductsService.getById.mockReturnValueOnce(product);

    await expect(service.createPurchase(product.id, desiredPrice, user as any as User)).rejects.toThrowError(NotFoundException);

    mockProductsService.getById.mockReturnValueOnce(undefined);
    await expect(service.createPurchase(999, desiredPrice, user as any as User)).rejects.toThrowError(NotFoundException);
  });
  it("should get only active user purchases", async () => {
    const user = {
      steam_id: 1,
      username: "test"
    };

    const purcheases = [
      {
        id: 1,
        expire_date: new Date(Date.now() + 1000 * 60),
        isCanceled: false,
        productId: 1
      },
      {
        id: 2,
        expire_date: new Date(Date.now() + 1000 * 60),
        isCanceled: true,
        productId: 1
      },
      {
        id: 3,
        expire_date: new Date(Date.now() - 1000 * 60),
        isCanceled: true,
        productId: 1
      },
      {
        id: 4,
        expire_date: null,
        isCanceled: false,
        productId: 1
      }
    ];

    mockPurchasesRepository.find.mockReturnValueOnce(purcheases);

    expect(await service.getActiveUserPurchasesByProductId(user as any as User, 1))
      .toEqual(
        [
          purcheases[0],
          purcheases[3]
        ]
      );
  });
  it("throw error if user dont have enough funds", async () => {
    const user = {
      steam_id: 1,
      username: "test"
    };
    const product = products[0];
    const userBalance = {
      balance: product.price - 1
    };
    const userPurchases = [];

    mockPaymentsService.getOrCreateBalance.mockReturnValueOnce(userBalance);
    mockProductsService.getById.mockReturnValueOnce(product);
    mockPurchasesRepository.find.mockReturnValueOnce(userPurchases);

    await expect(service.createPurchase(product.id, product.price, user as any as User)).rejects.toThrowError(BadRequestException);
  });
  it("throw error if user already bought the product", async () => {
    const user = {
      steam_id: 1,
      username: "test"
    };
    const product = products[0];
    const userBalance = {
      balance: product.price - 1
    };
    const userPurchases = [
      {
        id: 1,
        expire_date: new Date(Date.now() + 1000 * 60),
        isCanceled: false,
        productId: product.id
      }
    ];

    mockPaymentsService.getOrCreateBalance.mockReturnValueOnce(userBalance);
    mockProductsService.getById.mockReturnValueOnce(product);
    mockPurchasesRepository.find.mockReturnValueOnce(userPurchases);

    await expect(service.createPurchase(product.id, product.price, user as any as User)).rejects.toThrowError(BadRequestException);
  });
  it("throw error if admin activates purchase, but user already has purchase with this product active", async () => {
    const user = {
      id: 1,
      steam_id: 1,
      username: 121212
    };
    const userPurchases = [
      {
        id: 1,
        steam_id: user.steam_id,
        expire_date: new Date(Date.now() + 1000 * 60),
        isCanceled: true,
        cancel_date: new Date(Date.now() - (1000 * 60)),
        productId: products[0].id
      },
      {
        id: 2,
        steam_id: user.steam_id,
        expire_date: new Date(Date.now() + 1000 * 60),
        isCanceled: false,
        productId: products[0].id
      },
    ];

    mockPurchasesRepository.findOneBy.mockResolvedValue(userPurchases[0]);
    mockPurchasesRepository.find.mockResolvedValue(userPurchases);
    mockUserService.findBySteamId.mockResolvedValue(user);

    await expect(service.activatePurchase(userPurchases[0].id)).rejects.toThrowError(new BadRequestException("User already has active purchase for this product"));
  })

  it("should edit purchase name, steam_id, expire_date", async () => {
    const purchase = {
      id: 1,
      steam_id: 123,
      username: "KINGO",
      expire_date: Date.now() + 1000 * 10 * 60,
      isCanceled: false,
      cancel_date: null,
    }

    mockPurchasesRepository.findOneBy.mockResolvedValue(purchase);
    mockPurchasesRepository.save.mockResolvedValue(undefined);

    const newExpireDate = Date.now() + 1000 * 123 * 6;
    await expect(service.editPurchaseById(purchase.id, {
      steam_id: "999",
      username: "Someone",
      expire_date: new Date(newExpireDate)
    })).resolves.toBeDefined()

    expect(new Date(purchase.expire_date)).toEqual(new Date(newExpireDate));
    expect(purchase.username).toBe("Someone");
    expect(purchase.steam_id).toBe("999");
  })
});

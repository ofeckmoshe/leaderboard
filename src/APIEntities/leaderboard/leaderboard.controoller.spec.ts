import { Test, TestingModule } from "@nestjs/testing";
import { LeaderboardController } from "./leaderboard.controller";
import { RedisService } from "../../redis/redis.service";
import { UserService } from "../user/user.service";
import { HttpException, HttpStatus } from "@nestjs/common";

const results = {
  topUsersResult: [
    { userId: 5, userName: "User5", score: 500 },
    { userId: 4, userName: "User4", score: 400 },
    { userId: 3, userName: "User3", score: 300 },
  ],
  userPositionResult: [
    { userId: 3, userName: "User3", score: 300 },
    { userId: 2, userName: "User2", score: 200 },
    { userId: 1, userName: "User1", score: 100 },
  ],
  getByIdResult: [
    { userId: 2, userName: "User2", score: 200 },
  ],
};

describe("LeaderboardController", () => {
  let controller: LeaderboardController;
  let mockRedisService: Partial<RedisService>;
  let mockUserService: Partial<UserService>;

  beforeEach(async () => {
    mockRedisService = {
      getTopUsers: jest.fn().mockResolvedValue(results.topUsersResult),
      getUserPosition: jest
        .fn()
        .mockResolvedValue(Promise.resolve(results.userPositionResult)),
    };

    mockUserService = {
      getById: jest.fn().mockResolvedValue(results.getByIdResult),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaderboardController],
      providers: [
        {
          provide: RedisService,
          useValue: mockRedisService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: "USER_REPOSITORY",
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<LeaderboardController>(LeaderboardController);
  });

  it("should return top 3 users", async () => {
    const limit = 3;
    const result = await controller.getTopUsers(limit);
    expect(result).toEqual(results.topUsersResult);
    expect(mockRedisService.getTopUsers).toHaveBeenCalledWith(limit);
  });

  it("should retrieve user position", async () => {
    const user = { id: 2, name: "User2" };
    const result = await controller.getUserPosition(user.id);
    expect(result).toEqual(results.userPositionResult);
    expect(mockUserService.getById).toHaveBeenCalledWith(user.id);
  });

  it("should throw an exception for non-existent user", async () => {
    const invalidUserId = 99;
    expect(controller.getUserPosition(invalidUserId)).not.toEqual(
      new HttpException(
        "Error retrieving user position",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    );
  });
});

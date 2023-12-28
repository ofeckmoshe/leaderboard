import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ScoreService } from '../score/score.service';

const results = {
  addUserResult: [{ id: 5, name: "User5", imageUrl: "image5", score: 500 }],
  getByIdResult: [{ id: 5, name: "User5", imageUrl: "image5", score: 500 }],
  updateScoreResult: [{ id: 5, name: "User5", imageUrl: "image5", score: 20 }],
};

describe('UserController', () => {
  let controller: UserController;
  let mockUserService: Partial<UserService>;
  let mockScoreService: Partial<ScoreService>;

  beforeEach(async () => {

    mockUserService = {
      create: jest.fn().mockResolvedValue(results.addUserResult),
      getById: jest.fn().mockResolvedValue(results.getByIdResult),
    }
    mockScoreService ={
      updateUserScore: jest.fn().mockResolvedValue(results.updateScoreResult),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: ScoreService,
          useValue: mockScoreService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    mockUserService = module.get<UserService>(UserService);
    mockScoreService = module.get<ScoreService>(ScoreService);
  });
  
  describe('addUser', () => {
    it('should create and return a user', async () => {
      const mockUser = {name: 'User5', imageUrl: "image5", score: 500};
      const result = await controller.addUser(mockUser);
  
      expect(result).toEqual(results.addUserResult);
      expect(mockUserService.create).toHaveBeenCalledWith(mockUser);
    });
  
  });

  describe('updateScore', () => {
    it('should update and return the user score', async () => {
      const userId = 5;
      const scoreDTO = {score: 20};
      const mockUser = { id: 5, name: "User5", imageUrl: "image5", score: 20 };
      const result = await controller.updateScore(userId, scoreDTO)

      expect(result).toEqual(results.updateScoreResult);
      expect(mockUserService.getById).toHaveBeenCalledWith(userId);
    });
  
  });
  
  
});

import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { CreateUserDTO } from "./DTOs/CreateUserDTO.";
import { faker } from "@faker-js/faker";
import { Score } from "../../database/entities/score.entity";
import { RedisService } from "../../redis/redis.service";
import { ScoreService } from "../score/score.service";
import { CreateUserWithScoreDTO } from "./DTOs/CreateUserWithScoreDTO";

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_REPOSITORY")
    private userRepository: typeof User,
    private scoreService: ScoreService,
    private redisService: RedisService
  ) {}

  async create(createUserWithScoreDTO: CreateUserWithScoreDTO) {
    const createUserDTO: CreateUserDTO = {
      name: createUserWithScoreDTO.name,
      imageUrl: createUserWithScoreDTO.imageUrl,
    };
    const user = await this.userRepository.create<User>({ ...createUserDTO });
    const userId = user.id;
    const userName = user.name;
    if (userId) {
      const score = createUserWithScoreDTO.score
        ? createUserWithScoreDTO.score
        : 0;
      await this.scoreService.create({ userId, score });
      await this.redisService.addUserScore(userId, userName, score);
    }
    return await this.userRepository.findByPk(userId, {
      include: {
        model: Score,
      },
    });
  }

  async getById(userId: number) {
    return await this.userRepository.findByPk(userId, {
      include: {
        model: Score,
      },
    });
  }
  async generateMockData() {
    for (let i = 0; i < 100; i++) {
      const user = await this.create({
        name: faker.person.firstName(),
        imageUrl: faker.image.avatar(),
      });

      const scoreValue = faker.datatype.number({ min: 1, max: 1000 });
      await this.scoreService.create({ userId: user.id, score: scoreValue });
      await this.redisService.addUserScore(user.id, user.name, scoreValue);
    }
  }
}

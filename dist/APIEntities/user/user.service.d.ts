import { User } from "src/database/entities/user.entity";
import { RedisService } from "../../redis/redis.service";
import { ScoreService } from "../score/score.service";
import { CreateUserWithScoreDTO } from "./DTOs/CreateUserWithScoreDTO";
export declare class UserService {
    private userRepository;
    private scoreService;
    private redisService;
    constructor(userRepository: typeof User, scoreService: ScoreService, redisService: RedisService);
    create(createUserWithScoreDTO: CreateUserWithScoreDTO): Promise<User>;
    getById(userId: number): Promise<User>;
    generateMockData(): Promise<void>;
}

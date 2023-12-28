import { Score } from '../../database/entities/score.entity';
import { User } from '../../database/entities/user.entity';
import { CreateScoreDTO } from './DTOs/CreateScoreDTO';
import { RedisService } from '../../redis/redis.service';
export declare class ScoreService {
    private scoreRepository;
    private redisService;
    constructor(scoreRepository: typeof Score, redisService: RedisService);
    create(createScoreDTO: CreateScoreDTO): Promise<Score>;
    updateUserScore(user: User, newScore: number): Promise<Score>;
}

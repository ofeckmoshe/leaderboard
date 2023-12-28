import { Inject, Injectable } from '@nestjs/common';
import { Score } from '../../database/entities/score.entity';
import { User } from '../../database/entities/user.entity';
import { CreateScoreDTO } from './DTOs/CreateScoreDTO';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class ScoreService {
    constructor(
        @Inject('SCORE_REPOSITORY')
        private scoreRepository: typeof Score,
        private redisService: RedisService
      ) {}

      create(createScoreDTO: CreateScoreDTO){
        return this.scoreRepository.create<Score>({...createScoreDTO});
      }

      async updateUserScore(user: User, newScore: number) {
        const userId = user.id;
        const userName = user.name;
        let score = await this.scoreRepository.findOne({ where: { userId } });
        if (score) {
          score.score = newScore;
          await score.save();
        } else {
          score = await this.scoreRepository.create<Score>({ userId, score: newScore });
        }
    
        await this.redisService.addUserScore(userId, userName, newScore);
    
        return score;
      }
}

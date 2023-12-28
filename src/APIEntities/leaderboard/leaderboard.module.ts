import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/db.module'
import { ScoreModule } from '../score/score.module';
import { RedisModule } from 'src/redis/redis.module';
import { LeaderboardController } from './leaderboard.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DatabaseModule, ScoreModule, RedisModule, UserModule],
  controllers: [LeaderboardController],
  providers: [],
  exports: [],
})
export class LeaderboardModule {}
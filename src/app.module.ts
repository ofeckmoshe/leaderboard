import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/db.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './APIEntities/user/user.module';
import { ScoreModule } from './APIEntities/score/score.module';
import { LeaderboardModule } from './APIEntities/leaderboard/leaderboard.module';

@Module({
  imports: [DatabaseModule, SequelizeModule, RedisModule, UserModule, ScoreModule, LeaderboardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

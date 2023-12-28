import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { DatabaseModule } from 'src/database/db.module';
import { scoreProviders } from './score.provider';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [DatabaseModule, RedisModule],
  providers: [
    ScoreService,
    ...scoreProviders
    ],
  controllers: [],
  exports: [ScoreService],
})
export class ScoreModule {}

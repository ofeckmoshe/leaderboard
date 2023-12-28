import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/db.module'
import { UserService } from './user.service';
import { userProviders } from './user.provider';
import { UserController } from './user.controller';
import { ScoreModule } from '../score/score.module';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [DatabaseModule, ScoreModule, RedisModule],
  controllers: [UserController],
  providers: [
    UserService,
    ...userProviders
  ],
  exports: [UserService],
})
export class UserModule {}
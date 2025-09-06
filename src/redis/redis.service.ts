import { Injectable, Inject } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService {
  constructor(@Inject("REDIS_CLIENT") private readonly redisClient: Redis) {}
  async addUserScore(
    userId: number,
    userName: string,
    score: number
  ): Promise<void> {
    const member = `${userId}:${userName}`;
    try {
      await this.redisClient.zadd("leaderboard", score, member);
    } catch (error) {
      console.error(`Failed to add user score for ${member}:`, error);
      throw new Error("Unable to add user score to the leaderboard.");
    }
  }

  async getUserScoreAndRank(userId: number): Promise<[number, number]> {
    const score = await this.redisClient.zscore(
      "leaderboard",
      userId.toString()
    );
    const rank = await this.redisClient.zrank("leaderboard", userId.toString());
    return [parseInt(score, 10), rank];
  }

  async getTopUsers(limit: number): Promise<any[]> {
    const rawData = await this.redisClient.zrevrange(
      "leaderboard",
      0,
      limit - 1,
      "WITHSCORES"
    );

    const result = [];
    for (let i = 0; i < rawData.length; i += 2) {
      const member = rawData[i];
      const [userId, userName] = member.split(":");
      const score = parseInt(rawData[i + 1], 10);
      result.push({ userId, userName, score });
    }
    return result;
  }

  async getUserPosition(userId: number, userName: string): Promise<any[]> {
    
    const member = `${userId}:${userName}`;

    const rank = await this.redisClient.zrevrank("leaderboard", member);

    if (rank === null) {
        return [];
    }

    const start = Math.max(0, rank - 5);
    const end = rank + 5; 

    const rawData = await this.redisClient.zrevrange("leaderboard", start, end, "WITHSCORES");

    const result = [];
    for (let i = 0; i < rawData.length; i += 2) {
        const memberData = rawData[i].split(':');
        const score = parseInt(rawData[i + 1], 10);
        result.push({
            userId: parseInt(memberData[0], 10),
            userName: memberData[1],
            score,
        });
    }

    return result;
}
}

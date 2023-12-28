import Redis from "ioredis";
export declare class RedisService {
    private readonly redisClient;
    constructor(redisClient: Redis);
    addUserScore(userId: number, userName: string, score: number): Promise<void>;
    getUserScoreAndRank(userId: number): Promise<[number, number]>;
    getTopUsers(limit: number): Promise<any[]>;
    getUserPosition(userId: number, userName: string): Promise<any[]>;
}

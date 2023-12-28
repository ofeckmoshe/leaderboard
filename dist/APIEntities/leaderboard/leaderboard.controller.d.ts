import { HttpException } from "@nestjs/common";
import { RedisService } from "../../redis/redis.service";
import { UserService } from "../user/user.service";
export declare class LeaderboardController {
    private redisService;
    private userService;
    constructor(redisService: RedisService, userService: UserService);
    getTopUsers(limit: number): Promise<any[]>;
    getUserPosition(userId: number): Promise<any[] | HttpException>;
}

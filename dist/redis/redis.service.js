"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RedisService = class RedisService {
    constructor(redisClient) {
        this.redisClient = redisClient;
    }
    async addUserScore(userId, userName, score) {
        const member = `${userId}:${userName}`;
        await this.redisClient.zadd("leaderboard", score, member);
    }
    async getUserScoreAndRank(userId) {
        const score = await this.redisClient.zscore("leaderboard", userId.toString());
        const rank = await this.redisClient.zrank("leaderboard", userId.toString());
        return [parseInt(score, 10), rank];
    }
    async getTopUsers(limit) {
        const rawData = await this.redisClient.zrevrange("leaderboard", 0, limit - 1, "WITHSCORES");
        const result = [];
        for (let i = 0; i < rawData.length; i += 2) {
            const member = rawData[i];
            const [userId, userName] = member.split(":");
            const score = parseInt(rawData[i + 1], 10);
            result.push({ userId, userName, score });
        }
        return result;
    }
    async getUserPosition(userId, userName) {
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
};
RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("REDIS_CLIENT")),
    __metadata("design:paramtypes", [ioredis_1.default])
], RedisService);
exports.RedisService = RedisService;
//# sourceMappingURL=redis.service.js.map
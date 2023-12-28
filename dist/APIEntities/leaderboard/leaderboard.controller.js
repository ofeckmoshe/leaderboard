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
exports.LeaderboardController = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../../redis/redis.service");
const user_service_1 = require("../user/user.service");
const swagger_1 = require("@nestjs/swagger");
let LeaderboardController = class LeaderboardController {
    constructor(redisService, userService) {
        this.redisService = redisService;
        this.userService = userService;
    }
    async getTopUsers(limit) {
        try {
            return this.redisService.getTopUsers(limit);
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Error retrieving top users', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUserPosition(userId) {
        try {
            const user = await this.userService.getById(userId);
            if (!user) {
                return new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            const userName = user.name;
            return this.redisService.getUserPosition(userId, userName);
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Error retrieving user position', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get top users' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully retrieved top users' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: true, type: Number, description: 'Limit for the number of top users' }),
    __param(0, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LeaderboardController.prototype, "getTopUsers", null);
__decorate([
    (0, common_1.Get)(":userId/position"),
    (0, swagger_1.ApiOperation)({ summary: 'Get user position' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully retrieved user position' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    (0, swagger_1.ApiParam)({ name: 'userId', required: true, type: Number, description: 'Unique ID of the user' }),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LeaderboardController.prototype, "getUserPosition", null);
LeaderboardController = __decorate([
    (0, common_1.Controller)("leaderboard"),
    __metadata("design:paramtypes", [redis_service_1.RedisService,
        user_service_1.UserService])
], LeaderboardController);
exports.LeaderboardController = LeaderboardController;
//# sourceMappingURL=leaderboard.controller.js.map
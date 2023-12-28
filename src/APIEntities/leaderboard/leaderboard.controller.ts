import { Controller, Get, HttpException, HttpStatus, Param, Query } from "@nestjs/common";
import { RedisService } from "../../redis/redis.service";
import { UserService } from "../user/user.service";
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";

@Controller("leaderboard")
export class LeaderboardController {
  constructor(
    private redisService: RedisService,
    private userService: UserService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get top users' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved top users' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiQuery({ name: 'limit', required: true, type: Number, description: 'Limit for the number of top users' })
  async getTopUsers(@Query("limit") limit: number) {
    try {
      return this.redisService.getTopUsers(limit);
    } catch (error) {
      console.error(error);
      throw new HttpException('Error retrieving top users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(":userId/position")
  @ApiOperation({ summary: 'Get user position' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved user position' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'userId', required: true, type: Number, description: 'Unique ID of the user' })
  async getUserPosition(@Param("userId") userId: number) {
    try {
      const user = await this.userService.getById(userId);
      if (!user) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const userName = user.name;
      return this.redisService.getUserPosition(userId, userName);
    } catch (error) {
      console.error(error);
      throw new HttpException('Error retrieving user position', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

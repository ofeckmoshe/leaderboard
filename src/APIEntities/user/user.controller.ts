import { Body, Controller, HttpException, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags, ApiBody, ApiCreatedResponse, ApiParam, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from "./user.service";
import { CreateUserWithScoreDTO } from "./DTOs/CreateUserWithScoreDTO";
import { UpdateScoreDTO } from "./DTOs/UpdateScoreDTO";
import { ScoreService } from "../score/score.service";
import { User } from "src/database/entities/user.entity";
import { CreateUserWithScoreReqDTO } from "./DTOs/CreateUserWithScoreReqDTO";
import { UpdateScoreReqDTO } from "./DTOs/UpdateScoreReqDTO";

@ApiTags('user')
@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly scoreService: ScoreService
  ) {}
  @ApiOperation({ summary: 'Creating mock data of users and scores' })
  @ApiResponse({ status: 200, description: 'Generate and return mock user data' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post("create-mock")
  async createMock() {
    try {
      return this.userService.generateMockData();
    } catch (error) {
      console.error(error);
    }
  }

  @ApiBody({ type: CreateUserWithScoreReqDTO, required: true })
  @ApiOperation({ summary: 'Create New User' })
  @ApiResponse({ status: 201, description: 'Successfully created user' })
  @ApiResponse({ status: 400, description: 'Name and imageUrl cannot be null' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiCreatedResponse({ description: 'Create a new user.', type: User })
  @Post()
  async addUser(@Body() createUserDto: CreateUserWithScoreDTO) {
    if (!createUserDto.name || !createUserDto.imageUrl) {
      throw new HttpException('Name and imageUrl cannot be null.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    try {
      const user = await this.userService.create(createUserDto);
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  @ApiBody({ type: UpdateScoreReqDTO, required: true })
  @ApiParam({ name: 'userId', example: 1, type: Number, description: 'Unique ID of the user' })
  @ApiOperation({ summary: 'Update user score' })
  @ApiResponse({ status: 200, description: 'Successfully updted user score' })
  @ApiResponse({ status: 400, description: 'User Id and Score cannot be null' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiOkResponse({ description: 'Update the score of a user.', type: User })
  @Patch(":userId")
  async updateScore(
    @Param("userId") userId: number,
    @Body() updateScoreDto: UpdateScoreDTO
  ) {
    if (!userId|| !updateScoreDto.score) {
      throw new HttpException('UserId and score cannot be null.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    try {
      const user = await this.userService.getById(userId);
      if(!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
      return this.scoreService.updateUserScore(user, updateScoreDto.score);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

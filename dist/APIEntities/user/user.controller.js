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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const CreateUserWithScoreDTO_1 = require("./DTOs/CreateUserWithScoreDTO");
const UpdateScoreDTO_1 = require("./DTOs/UpdateScoreDTO");
const score_service_1 = require("../score/score.service");
const user_entity_1 = require("../../database/entities/user.entity");
const CreateUserWithScoreReqDTO_1 = require("./DTOs/CreateUserWithScoreReqDTO");
const UpdateScoreReqDTO_1 = require("./DTOs/UpdateScoreReqDTO");
let UserController = class UserController {
    constructor(userService, scoreService) {
        this.userService = userService;
        this.scoreService = scoreService;
    }
    async createMock() {
        try {
            return this.userService.generateMockData();
        }
        catch (error) {
            console.error(error);
        }
    }
    async addUser(createUserDto) {
        if (!createUserDto.name || !createUserDto.imageUrl) {
            throw new common_1.HttpException('Name and imageUrl cannot be null.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            const user = await this.userService.create(createUserDto);
            return user;
        }
        catch (error) {
            console.error(error);
        }
    }
    async updateScore(userId, updateScoreDto) {
        if (!userId || !updateScoreDto.score) {
            throw new common_1.HttpException('UserId and score cannot be null.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            const user = await this.userService.getById(userId);
            return this.scoreService.updateUserScore(user, updateScoreDto.score);
        }
        catch (error) {
            console.error(error);
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Creating mock data of users and scores' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Generate and return mock user data' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    (0, common_1.Post)("create-mock"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createMock", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: CreateUserWithScoreReqDTO_1.CreateUserWithScoreReqDTO, required: true }),
    (0, swagger_1.ApiOperation)({ summary: 'Create New User' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Successfully created user' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Name and imageUrl cannot be null' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Create a new user.', type: user_entity_1.User }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserWithScoreDTO_1.CreateUserWithScoreDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: UpdateScoreReqDTO_1.UpdateScoreReqDTO, required: true }),
    (0, swagger_1.ApiParam)({ name: 'userId', example: 1, type: Number, description: 'Unique ID of the user' }),
    (0, swagger_1.ApiOperation)({ summary: 'Update user score' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully updted user score' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'User Id and Score cannot be null' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Update the score of a user.', type: user_entity_1.User }),
    (0, common_1.Patch)(":userId"),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateScoreDTO_1.UpdateScoreDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateScore", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService,
        score_service_1.ScoreService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
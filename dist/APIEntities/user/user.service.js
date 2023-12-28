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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const faker_1 = require("@faker-js/faker");
const score_entity_1 = require("../../database/entities/score.entity");
const redis_service_1 = require("../../redis/redis.service");
const score_service_1 = require("../score/score.service");
let UserService = class UserService {
    constructor(userRepository, scoreService, redisService) {
        this.userRepository = userRepository;
        this.scoreService = scoreService;
        this.redisService = redisService;
    }
    async create(createUserWithScoreDTO) {
        const createUserDTO = {
            name: createUserWithScoreDTO.name,
            imageUrl: createUserWithScoreDTO.imageUrl,
        };
        const user = await this.userRepository.create(Object.assign({}, createUserDTO));
        const userId = user.id;
        const userName = user.name;
        if (userId) {
            const score = createUserWithScoreDTO.score
                ? createUserWithScoreDTO.score
                : 0;
            await this.scoreService.create({ userId, score });
            await this.redisService.addUserScore(userId, userName, score);
        }
        return await this.userRepository.findByPk(userId, {
            include: {
                model: score_entity_1.Score,
            },
        });
    }
    async getById(userId) {
        return await this.userRepository.findByPk(userId, {
            include: {
                model: score_entity_1.Score,
            },
        });
    }
    async generateMockData() {
        for (let i = 0; i < 100; i++) {
            const user = await this.create({
                name: faker_1.faker.person.firstName(),
                imageUrl: faker_1.faker.image.avatar(),
            });
            const scoreValue = faker_1.faker.datatype.number({ min: 1, max: 1000 });
            await this.scoreService.create({ userId: user.id, score: scoreValue });
            await this.redisService.addUserScore(user.id, user.name, scoreValue);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("USER_REPOSITORY")),
    __metadata("design:paramtypes", [Object, score_service_1.ScoreService,
        redis_service_1.RedisService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
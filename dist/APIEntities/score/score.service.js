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
exports.ScoreService = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../../redis/redis.service");
let ScoreService = class ScoreService {
    constructor(scoreRepository, redisService) {
        this.scoreRepository = scoreRepository;
        this.redisService = redisService;
    }
    create(createScoreDTO) {
        return this.scoreRepository.create(Object.assign({}, createScoreDTO));
    }
    async updateUserScore(user, newScore) {
        const userId = user.id;
        const userName = user.name;
        let score = await this.scoreRepository.findOne({ where: { userId } });
        if (score) {
            score.score = newScore;
            await score.save();
        }
        else {
            score = await this.scoreRepository.create({ userId, score: newScore });
        }
        await this.redisService.addUserScore(userId, userName, newScore);
        return score;
    }
};
ScoreService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SCORE_REPOSITORY')),
    __metadata("design:paramtypes", [Object, redis_service_1.RedisService])
], ScoreService);
exports.ScoreService = ScoreService;
//# sourceMappingURL=score.service.js.map
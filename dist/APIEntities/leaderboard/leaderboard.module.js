"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardModule = void 0;
const common_1 = require("@nestjs/common");
const db_module_1 = require("../../database/db.module");
const score_module_1 = require("../score/score.module");
const redis_module_1 = require("../../redis/redis.module");
const leaderboard_controller_1 = require("./leaderboard.controller");
const user_module_1 = require("../user/user.module");
let LeaderboardModule = class LeaderboardModule {
};
LeaderboardModule = __decorate([
    (0, common_1.Module)({
        imports: [db_module_1.DatabaseModule, score_module_1.ScoreModule, redis_module_1.RedisModule, user_module_1.UserModule],
        controllers: [leaderboard_controller_1.LeaderboardController],
        providers: [],
        exports: [],
    })
], LeaderboardModule);
exports.LeaderboardModule = LeaderboardModule;
//# sourceMappingURL=leaderboard.module.js.map
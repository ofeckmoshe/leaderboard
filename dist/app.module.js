"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const db_module_1 = require("./database/db.module");
const sequelize_1 = require("@nestjs/sequelize");
const redis_module_1 = require("./redis/redis.module");
const user_module_1 = require("./APIEntities/user/user.module");
const score_module_1 = require("./APIEntities/score/score.module");
const leaderboard_module_1 = require("./APIEntities/leaderboard/leaderboard.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [db_module_1.DatabaseModule, sequelize_1.SequelizeModule, redis_module_1.RedisModule, user_module_1.UserModule, score_module_1.ScoreModule, leaderboard_module_1.LeaderboardModule],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
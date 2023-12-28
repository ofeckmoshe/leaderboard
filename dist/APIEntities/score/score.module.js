"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreModule = void 0;
const common_1 = require("@nestjs/common");
const score_service_1 = require("./score.service");
const db_module_1 = require("../../database/db.module");
const score_provider_1 = require("./score.provider");
const redis_module_1 = require("../../redis/redis.module");
let ScoreModule = class ScoreModule {
};
ScoreModule = __decorate([
    (0, common_1.Module)({
        imports: [db_module_1.DatabaseModule, redis_module_1.RedisModule],
        providers: [
            score_service_1.ScoreService,
            ...score_provider_1.scoreProviders
        ],
        controllers: [],
        exports: [score_service_1.ScoreService],
    })
], ScoreModule);
exports.ScoreModule = ScoreModule;
//# sourceMappingURL=score.module.js.map
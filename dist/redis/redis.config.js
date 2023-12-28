"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.redisConfig = {
    host: process.env.REDIS_HOST,
    port: 6379,
};
//# sourceMappingURL=redis.config.js.map
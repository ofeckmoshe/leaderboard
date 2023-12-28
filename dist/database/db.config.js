"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("./entities/user.entity");
const score_entity_1 = require("./entities/score.entity");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const DBConnectionObject = {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
};
const DBModelsArray = [
    user_entity_1.User,
    score_entity_1.Score,
];
exports.default = {
    DBConnectionObject,
    DBModelsArray,
};
//# sourceMappingURL=db.config.js.map
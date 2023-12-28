"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreProviders = void 0;
const score_entity_1 = require("../../database/entities/score.entity");
exports.scoreProviders = [
    {
        provide: 'SCORE_REPOSITORY',
        useValue: score_entity_1.Score,
    },
];
//# sourceMappingURL=score.provider.js.map
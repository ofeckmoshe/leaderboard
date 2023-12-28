"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProviders = void 0;
const user_entity_1 = require("../../database/entities/user.entity");
exports.userProviders = [
    {
        provide: 'USER_REPOSITORY',
        useValue: user_entity_1.User,
    },
];
//# sourceMappingURL=user.provider.js.map
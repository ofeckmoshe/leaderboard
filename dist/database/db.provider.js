"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProvider = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const db_config_1 = require("./db.config");
exports.databaseProvider = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new sequelize_typescript_1.Sequelize(db_config_1.default.DBConnectionObject);
            sequelize.addModels(db_config_1.default.DBModelsArray);
            if (process.env['SHOW_SQL_LOG'] && process.env['SHOW_SQL_LOG'] === 'yes') {
                sequelize.options.logging = true;
            }
            else {
                sequelize.options.logging = false;
            }
            await sequelize.sync();
            return sequelize;
        },
    },
];
//# sourceMappingURL=db.provider.js.map
import { SequelizeOptions } from 'sequelize-typescript';
import { User } from './entities/user.entity';
import { Score } from './entities/score.entity';
import { config } from 'dotenv';
config();

const DBConnectionObject: SequelizeOptions = {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
};

const DBModelsArray = [
    User,
    Score,
];

export default {
    DBConnectionObject,
    DBModelsArray,
};
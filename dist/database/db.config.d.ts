import { SequelizeOptions } from 'sequelize-typescript';
import { User } from './entities/user.entity';
import { Score } from './entities/score.entity';
declare const _default: {
    DBConnectionObject: SequelizeOptions;
    DBModelsArray: (typeof Score | typeof User)[];
};
export default _default;

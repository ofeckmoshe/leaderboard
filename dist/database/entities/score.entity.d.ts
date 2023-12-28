import { Model } from 'sequelize-typescript';
import { User } from './user.entity';
export declare class Score extends Model<Score> {
    userId: number;
    score: number;
    user: User;
}

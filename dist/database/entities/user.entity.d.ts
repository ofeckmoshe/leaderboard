import { Model } from 'sequelize-typescript';
import { Score } from './score.entity';
export declare class User extends Model<User> {
    id: number;
    name: string;
    imageUrl: string;
    score: Score;
}

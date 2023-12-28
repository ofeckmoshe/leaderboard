import {
    Column,
    Model,
    Table,
    PrimaryKey,
    AutoIncrement,
    HasOne,
    AllowNull
  } from 'sequelize-typescript';
import { Score } from './score.entity';
  
  @Table
  export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
    @AllowNull(false)
    @Column
    name: string;
  
    @AllowNull(false)
    @Column
    imageUrl: string;

    @HasOne(() => Score)
    score: Score;
  }
  
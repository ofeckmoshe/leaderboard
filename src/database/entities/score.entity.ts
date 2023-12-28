import {
    Column,
    Model,
    Table,
    ForeignKey,
    Index,
    BelongsTo
  } from 'sequelize-typescript';
  import { User } from './user.entity';
  
  @Table
  export class Score extends Model<Score> {
    @ForeignKey(() => User)
    @Column
    userId: number;
  
    @Index
    @Column
    score: number;

    @BelongsTo(() => User)
    user: User;
  }
  
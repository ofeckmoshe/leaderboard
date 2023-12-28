import { Score } from "src/database/entities/score.entity";

export const scoreProviders = [
  {
    provide: 'SCORE_REPOSITORY',
    useValue: Score,
  },
];
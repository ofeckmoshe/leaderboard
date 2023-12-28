import { User } from "src/database/entities/user.entity";

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];
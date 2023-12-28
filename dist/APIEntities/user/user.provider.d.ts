import { User } from "src/database/entities/user.entity";
export declare const userProviders: {
    provide: string;
    useValue: typeof User;
}[];

import Redis from 'ioredis';
export declare const redisProvider: {
    provide: string;
    useFactory: () => Redis;
}[];

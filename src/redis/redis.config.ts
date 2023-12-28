import { config } from 'dotenv';
config();

export const redisConfig = {
    host: process.env.REDIS_HOST, 
    port: 6379,  
};

import Redis from 'ioredis';
import { redisConfig } from './redis.config';

export const redisProvider = [
  {
    provide: 'REDIS_CLIENT',
    useFactory: () => {
      const client = new Redis({
        host: redisConfig.host,
        port: redisConfig.port,
      });

      client.on('connect', () => console.log('Connected to Redis'));
      client.on('error', (err) => console.error('Redis Client Error', err));

      return client;
    },
  },
];

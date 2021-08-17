import { parseEnvBool } from './helper';
import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
    cache_ttl: parseInt(process.env.CACHE_TTL),
    redis_host: process.env.REDIS_HOST || 'localhost',
    redis_port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    redis_password: process.env.REDIS_PASSWORD,
    redis_tls: parseEnvBool(process.env.REDIS_TLS),
}));

import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    driver: 'mysql' as const,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
}));

import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    app_name: process.env.APP_NAME || 'nestjs-sql',
    port: parseInt(process.env.PORT, 10) || '3000',
}));

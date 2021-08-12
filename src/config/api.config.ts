import { registerAs } from '@nestjs/config';

export default registerAs('api', () => ({
    api_version: process.env.API_VERSION || '1.0',
    api_v1: process.env.API_V1 || '/api/v1',
}));

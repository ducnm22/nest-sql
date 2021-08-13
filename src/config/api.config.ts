import { registerAs } from '@nestjs/config';

export default registerAs('api', () => ({
    api_version: process.env.API_VERSION || '1.0',
    api_v1: process.env.API_V1 || '/api/v1',
    auth: {
        jwt_secret: process.env.JWT_SECRET,
        token_expire_in: process.env.TOKEN_EXPIRE_IN || '1d',
        password_hash_salt: parseInt(process.env.PASSWORD_HASH_SALT, 10) || 10,
    },
}));

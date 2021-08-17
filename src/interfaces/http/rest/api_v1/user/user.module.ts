import * as redisStore from 'cache-manager-redis-store';

import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';

import CacheConfig from '@src/config/cache.config';
import { CreateUserModule } from '@src/app/user/createUser/createUser.module';
import { ListUsersModule } from '@src/app/user/listUsers/listUser.module';
import { UserController } from './user.controller';

@Module({
    imports: [
        CreateUserModule,
        ListUsersModule,
        CacheModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (cacheConfig: ConfigType<typeof CacheConfig>) => {
                return {
                    ttl: cacheConfig.cache_ttl,
                    store: redisStore,
                    host: cacheConfig.redis_host,
                    port: cacheConfig.redis_port,
                    auth_pass: cacheConfig.redis_password,
                    tls: cacheConfig.redis_tls
                        ? {
                              servername: cacheConfig.redis_host,
                          }
                        : undefined,
                };
            },
            inject: [CacheConfig.KEY],
        }),
    ],
    controllers: [UserController],
})
export class UserModule {}

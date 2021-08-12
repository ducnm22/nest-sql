// init auto mapper instance
// can't use nest dependency injection since we need to use mapper inside typeorm's custom repositories
import '@src/infra/autoMapper';

import * as DBModels from '@src/infra/database/model';

import { ConfigModule, ConfigType } from '@nestjs/config';

import APIConfig from '@src/config/api.config';
import APPConfig from '@src/config/app.config';
import DBConfig from '@src/config/database.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@src/interfaces/http/rest/api_v1/routeModules';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [APIConfig, APPConfig, DBConfig],
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: async (dbConfig: ConfigType<typeof DBConfig>) => ({
                type: dbConfig.driver,
                host: dbConfig.host,
                port: dbConfig.port,
                database: dbConfig.name,
                username: dbConfig.user,
                password: dbConfig.password,
                entities: Object.values(DBModels),
                synchronize: true,
            }),
            inject: [DBConfig.KEY],
        }),

        // resource modules
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
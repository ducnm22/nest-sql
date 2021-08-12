import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import APIConfig from '@src/config/api.config';
import APPConfig from '@src/config/app.config';
import { AppModule } from './app.module';
import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    // get api and app config
    const apiConfig = await app.get<string, ConfigType<typeof APIConfig>>(
        APIConfig.KEY,
    );

    const appConfig = await app.get<string, ConfigType<typeof APPConfig>>(
        APPConfig.KEY,
    );

    // set app global api path prefix
    app.setGlobalPrefix(apiConfig.api_v1);

    // Transform and validate payload objects global
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    // setup swagger
    const options = new DocumentBuilder()
        .setTitle(appConfig.app_name)
        .setDescription('App API description')
        .setVersion(apiConfig.api_v1)
        .addBearerAuth({
            type: 'http',
        })
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
    await app.listen(appConfig.port);
}

bootstrap();

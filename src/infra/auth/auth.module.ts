import APIConfig from '@src/config/api.config';
import { AuthService } from './auth.service';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@src/infra/user/user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (apiConfgi: ConfigType<typeof APIConfig>) => ({
                secret: apiConfgi.auth.jwt_secret,
                signOptions: {
                    expiresIn: apiConfgi.auth.token_expire_in,
                },
            }),
            inject: [APIConfig.KEY],
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}

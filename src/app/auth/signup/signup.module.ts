import { AuthModule } from '@src/infra/auth/auth.module';
import { Module } from '@nestjs/common';
import { SignUpUsecase } from './signup.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@src/infra/user/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository]), AuthModule],
    providers: [SignUpUsecase],
    exports: [SignUpUsecase],
})
export class SignUpModule {}

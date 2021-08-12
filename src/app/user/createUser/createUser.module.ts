import { AuthModule } from '@src/infra/auth/auth.module';
import { CreateUserUsecase } from './createUser.usecase';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@src/infra/user/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository]), AuthModule],
    providers: [CreateUserUsecase],
    exports: [CreateUserUsecase],
})
export class CreateUserModule {}

import { AuthModule } from '@src/infra/auth/auth.module';
import { Module } from '@nestjs/common';
import { SignInUsecase } from './signin.usecase';

@Module({
    imports: [AuthModule],
    providers: [SignInUsecase],
    exports: [SignInUsecase],
})
export class SignInModule {}

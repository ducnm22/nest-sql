import { AuthenticationController } from './auth.controller';
import { Module } from '@nestjs/common';
import { SignInModule } from '@src/app/auth/signin/signin.module';
import { SignUpModule } from '@src/app/auth/signup/signup.module';

@Module({
    imports: [SignUpModule, SignInModule],
    controllers: [AuthenticationController],
})
export class AuthenticationModule {}

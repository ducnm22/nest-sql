import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SignUpUsecase } from '@src/app/auth/signup/signup.usecase';
import { UserEntity } from '@src/domain/user';
import { AuthPayload } from '@src/domain/auth';
import { ApiTags } from '@nestjs/swagger';
import { AuthToken } from '@src/domain/auth';
import { Request } from 'express';
import { SignInUsecase } from '@src/app/auth/signin/signin.usecase';
import { PublicRoute } from '@src/interfaces/shared/publicRoute.decorator';
import { AppAuthGuard } from '@src/interfaces/shared/guards/appAuth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthenticationController {
    constructor(
        private readonly signUpUsecase: SignUpUsecase,
        private readonly signInUsecase: SignInUsecase,
    ) {}

    @PublicRoute()
    @Post('signup')
    async signup(@Body() signUpPayload: AuthPayload): Promise<AuthToken> {
        return await this.signUpUsecase.processRequest(signUpPayload);
    }

    @PublicRoute()
    @UseGuards(AppAuthGuard)
    @Post('signin')
    async signin(@Body() _authPayload: AuthPayload, @Req() req: Request) {
        return await this.signInUsecase.processRequest(req.user as UserEntity);
    }
}

import { AuthService } from '@src/infra/auth/auth.service';
import { AuthToken } from '@src/domain/auth';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@src/domain/user';
import { transformAndValidate } from 'class-transformer-validator';

@Injectable()
export class SignInUsecase {
    constructor(private authService: AuthService) {}

    async processRequest(user: UserEntity): Promise<AuthToken> {
        // generate jwt auth token and return
        const token = await this.authService.getToken(user);

        const authToken = await transformAndValidate(AuthToken, {
            accessToken: token,
        });

        return authToken;
    }
}

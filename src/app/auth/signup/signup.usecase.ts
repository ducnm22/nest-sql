import { AuthInfo, AuthPayload } from '@src/domain/auth';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AuthService } from '@src/infra/auth/auth.service';
import { AuthToken } from '@src/domain/auth';
import { Mapper } from '@nartc/automapper';
import { UserEntity } from '@src/domain/user';
import { UserRepository } from '@src/infra/user/user.repository';
import { transformAndValidate } from 'class-transformer-validator';

@Injectable()
export class SignUpUsecase {
    constructor(
        private userRepository: UserRepository,
        private authService: AuthService,
    ) {}

    async processRequest(signUpPayload: AuthPayload): Promise<AuthToken> {
        // check if email already exist in db
        const existUser = await this.userRepository.findByEmail(
            signUpPayload.email,
        );

        if (existUser) {
            throw new HttpException(
                'This email address is already used!',
                HttpStatus.OK,
            );
        }

        // hash password
        const hashedPassword = await this.authService.hashPassword(
            signUpPayload.password,
        );

        const signUpInfo: AuthInfo = {
            ...signUpPayload,
            email: signUpPayload.email,
            hashedPassword,
        };

        const userInDb = await this.userRepository.createAndSave(signUpInfo);

        // generate jwt auth token and return
        const token = await this.authService.getToken(
            Mapper.map(userInDb, UserEntity),
        );

        const authToken = await transformAndValidate(AuthToken, {
            accessToken: token,
        });

        return authToken;
    }
}

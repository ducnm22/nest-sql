import {
    CreateUserInfo,
    CreateUserPayload,
    UserEntity,
} from '@src/domain/user';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AuthService } from '@src/infra/auth/auth.service';
import { Mapper } from '@nartc/automapper';
import { UserRepository } from '@src/infra/user/user.repository';

@Injectable()
export class CreateUserUsecase {
    constructor(
        private userRepository: UserRepository,
        private authService: AuthService,
    ) {}

    async processRequest(
        createUserPayload: CreateUserPayload,
    ): Promise<UserEntity> {
        // check if email already exist in db
        const existUser = await this.userRepository.findByEmail(
            createUserPayload.email,
        );

        if (existUser) {
            throw new HttpException(
                'This email address is already used!',
                HttpStatus.OK,
            );
        }

        // hash password
        const hashedPassword = await this.authService.hashPassword(
            createUserPayload.password,
        );

        const createUserInfo: CreateUserInfo = {
            ...createUserPayload,
            hashedPassword,
        };

        const createdUser = await this.userRepository.createAndSave(
            createUserInfo,
        );

        return Mapper.map(createdUser, UserEntity);
    }
}

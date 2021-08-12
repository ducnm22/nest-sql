import { CreateUserPayload, UserEntity } from '@src/domain/user';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserRepository } from '@src/infra/user/user.repository';

@Injectable()
export class CreateUserUsecase {
    constructor(private userRepository: UserRepository) {}

    async processRequest(
        createUserPayload: CreateUserPayload,
    ): Promise<UserEntity> {
        // check if email already exist in db
        const existConsumer = await this.userRepository.findByEmail(
            createUserPayload.email,
        );

        if (existConsumer) {
            throw new HttpException(
                'This email address is already used!',
                HttpStatus.OK,
            );
        }

        return await this.userRepository.createAndSave(createUserPayload);
    }
}

import { compare, hash } from 'bcrypt';

import APIConfig from '@src/config/api.config';
import { ConfigType } from '@nestjs/config';
import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Mapper } from '@nartc/automapper';
import { UserEntity } from '@src/domain/user';
import { UserRepository } from '@src/infra/user/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        @Inject(APIConfig.KEY)
        private readonly apiConfig: ConfigType<typeof APIConfig>,
    ) {}

    /**
     * Hash password
     * @param {string} password
     * @returns {Promise<string>}
     */
    async hashPassword(password: string): Promise<string> {
        const hashedpassword = await hash(
            password,
            this.apiConfig.auth.password_hash_salt,
        );

        return hashedpassword;
    }

    /**
     * Compare password and hashedPassword
     *
     * @param {string} password
     * @param {string} hashedPassword
     * @returns {Promise<string>}
     */
    async compareHashPassword(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        const valid = await compare(password, hashedPassword);

        return valid;
    }

    /**
     * Validate user authentication
     *
     * @param {string} email
     * @param {string} password
     * @returns {Promise<UserEntity | null>}
     */
    async validateUser(
        email: string,
        password: string,
    ): Promise<UserEntity | null> {
        const userInDb = await this.userRepository.findByEmail(email);

        if (!userInDb) {
            return null;
        }

        // validate login password
        const isValid = await this.compareHashPassword(
            password,
            userInDb.hashedPassword,
        );

        if (!isValid) return null;

        return Mapper.map(userInDb, UserEntity);
    }

    /**
     * Generate token from user data
     *
     * @param {UserEntity} user
     * @returns {Promise<string>} signed jwt token
     */
    async getToken(user: UserEntity): Promise<string> {
        // token payload
        const payload = {
            email: user.email,
            sub: user.id,
        };

        // return signed jwt token
        return this.jwtService.sign(payload);
    }
}

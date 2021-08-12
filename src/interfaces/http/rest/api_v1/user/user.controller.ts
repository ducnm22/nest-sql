import { Body, Controller, Get, Query, Post } from '@nestjs/common';
import { CreateUserUsecase } from '@src/app/user/createUser/createUser.usecase';
import { ListUsersUsecase } from '@src/app/user/listUsers/listUsers.usecase';
import {
    CreateUserPayload,
    ListUsersPayload,
    UserEntity,
} from '@src/domain/user';

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserUsecase: CreateUserUsecase,
        private readonly listUsersUsecase: ListUsersUsecase,
    ) {}

    @Post()
    async createUser(
        @Body() createUserPayload: CreateUserPayload,
    ): Promise<UserEntity> {
        return await this.createUserUsecase.processRequest(createUserPayload);
    }

    @Get()
    async listUsers(@Query() filter: ListUsersPayload) {
        console.log('>>>>>>filterrr', filter);
        return await this.listUsersUsecase.processRequest(filter);
    }
}

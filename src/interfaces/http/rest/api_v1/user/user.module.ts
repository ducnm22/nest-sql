import { CreateUserModule } from '@src/app/user/createUser/createUser.module';
import { ListUsersModule } from '@src/app/user/listUsers/listUser.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
    imports: [CreateUserModule, ListUsersModule],
    controllers: [UserController],
})
export class UserModule {}

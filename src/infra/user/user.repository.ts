import {
    AbstractRepository,
    EntityRepository,
    FindConditions,
    ObjectLiteral,
} from 'typeorm';
import {
    CreateUserInfo,
    IUserRepository,
    ListUsersInfo,
    UserEntity,
} from '@src/domain/user';

import { Mapper } from '@nartc/automapper';
import { UserModel } from '@src/infra/database/model';

@EntityRepository(UserModel)
export class UserRepository
    extends AbstractRepository<UserModel>
    implements IUserRepository
{
    async createAndSave(userInfo: CreateUserInfo): Promise<UserEntity> {
        const newUser = new UserModel();

        newUser.firstName = userInfo.firstName;
        newUser.lastName = userInfo.lastName;
        newUser.email = userInfo.email;
        newUser.dob = userInfo.dob;
        newUser.address = userInfo.address;

        newUser.isActive = false;
        newUser.createdDate = userInfo.createdDate;

        const createdUser = await this.repository.save(newUser);
        return Mapper.map(createdUser, UserEntity);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        // get user model instance by email
        const res = await this.repository.find({
            where: {
                email,
            },
        });

        // return null if empty result array
        if (res.length < 1) return null;

        // user is first element in array since id is unique
        return Mapper.map(res[0], UserEntity);
    }

    async listUsers(filter: ListUsersInfo): Promise<[UserEntity[], number]> {
        const query: FindConditions<UserModel> | ObjectLiteral = {};

        if (filter.firstName) {
            query.firstName = filter.firstName;
        }

        if (filter.lastName) {
            query.lastName = filter.lastName;
        }

        if (filter.email) {
            query.email = filter.email;
        }

        const [users, count] = await this.repository.findAndCount({
            where: query,
            skip: (filter.pageIndex - 1) * filter.limit,
            take: filter.limit,
        });

        return [users.map((u) => Mapper.map(u, UserEntity)), count];
    }
}

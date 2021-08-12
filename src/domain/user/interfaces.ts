import { BaseListFilterInfo } from '@src/domain/helper/base.dto';
import { UserEntity } from './user.entity';

export interface CreateUserInfo {
    firstName: string;
    lastName: string;
    email: string;
    dob: Date;
    address?: string;
    createdDate?: Date;
}

export interface ListUsersInfo extends BaseListFilterInfo {
    firstName?: string;
    lastName?: string;
    email?: string;
}

export interface IUserRepository {
    createAndSave: (createUserInfo: CreateUserInfo) => Promise<UserEntity>;
    findByEmail: (email: string) => Promise<UserEntity | null>;
    listUsers: (filter: ListUsersInfo) => Promise<[UserEntity[], number]>;
}

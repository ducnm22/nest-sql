import { BaseListFilterInfo } from '@src/domain/helper/base.dto';
import { UserInDb } from './user.entity';
export interface CreateUserInfo {
    firstName?: string;
    lastName?: string;
    email: string;
    dob?: Date;
    address?: string;
    hashedPassword: string;
    createdDate?: Date;
}

export interface ListUsersInfo extends BaseListFilterInfo {
    firstName?: string;
    lastName?: string;
    email?: string;
}

export interface IUserRepository {
    createAndSave: (createUserInfo: CreateUserInfo) => Promise<UserInDb>;
    findByEmail: (email: string) => Promise<UserInDb | null>;
    listUsers: (filter: ListUsersInfo) => Promise<[UserInDb[], number]>;
}

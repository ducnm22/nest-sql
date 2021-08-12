import {
    IsDate,
    IsDateString,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

import { BaseListFilterPayload } from '@src/domain/helper/base.dto';
import { ListUsersInfo } from './interfaces';

export class CreateUserPayload {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    address?: string;

    @IsNotEmpty()
    @IsDateString()
    dob: Date;

    @IsOptional()
    @IsDate()
    createdDate?: Date = new Date();
}

export class ListUsersPayload
    extends BaseListFilterPayload
    implements ListUsersInfo
{
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

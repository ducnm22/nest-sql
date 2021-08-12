import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

import { AutoMap } from '@nartc/automapper';

export class UserBase {
    @AutoMap()
    @IsString()
    firstName: string;

    @AutoMap()
    @IsString()
    lastName: string;

    @AutoMap()
    @IsEmail()
    email: string;

    @AutoMap()
    @IsOptional()
    @IsString()
    address?: string;

    @AutoMap()
    @IsDate()
    dob: Date;

    @AutoMap()
    @IsDate()
    createdDate: Date = new Date();

    @AutoMap()
    @IsOptional()
    @IsDate()
    updatedDate?: Date;
}

export class UserEntity extends UserBase {
    @AutoMap()
    @IsString()
    id: string;
}

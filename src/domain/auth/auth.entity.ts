import { IsNotEmpty, IsString } from 'class-validator';

export class AuthToken {
    @IsNotEmpty()
    @IsString()
    accessToken: string;
}

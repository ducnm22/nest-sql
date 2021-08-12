import { AutoMapper, ProfileBase } from '@nartc/automapper';
import { UserEntity, UserInDb } from '@src/domain/user';

import { UserModel } from '../database/model/index';

export class UserMapperProfile extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();

        mapper.createMap(UserModel, UserInDb).reverseMap();
        mapper.createMap(UserInDb, UserEntity).reverseMap();
    }
}

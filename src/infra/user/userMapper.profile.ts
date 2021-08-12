import { AutoMapper, ProfileBase } from '@nartc/automapper';

import { UserEntity } from '@src/domain/user';
import { UserModel } from '../database/model/index';

export class UserMapperProfile extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();

        mapper.createMap(UserModel, UserEntity).reverseMap();
    }
}

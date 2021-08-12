import { Mapper } from '@nartc/automapper';
import { UserMapperProfile } from '../user/userMapper.profile';

// global settings
Mapper.withGlobalSettings({
    // use undefined for empty value instead of default null
    useUndefined: true,
});

// init mapper profiles
Mapper.addProfile(UserMapperProfile);

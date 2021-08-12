import { ListUsersPayload, UserEntity } from '@src/domain/user';

import { Injectable } from '@nestjs/common';
import { ListResponseData } from '@src/domain/helper/base.dto';
import { Mapper } from '@nartc/automapper';
import { UserRepository } from '@src/infra/user/user.repository';

@Injectable()
export class ListUsersUsecase {
    constructor(private userRepository: UserRepository) {}

    async processRequest(
        filter: ListUsersPayload,
    ): Promise<ListResponseData<UserEntity>> {
        const [userInDbs, count] = await this.userRepository.listUsers(filter);

        const data = userInDbs.map((u) => Mapper.map(u, UserEntity));

        return {
            data,
            info: {
                total: count,
                pageSize: filter.limit,
                pageIndex: filter.pageIndex,
            },
        };
    }
}

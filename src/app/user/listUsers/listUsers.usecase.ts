import { ListUsersPayload, UserEntity } from '@src/domain/user';

import { Injectable } from '@nestjs/common';
import { ListResponseData } from '@src/domain/helper/base.dto';
import { UserRepository } from '@src/infra/user/user.repository';

@Injectable()
export class ListUsersUsecase {
    constructor(private userRepository: UserRepository) {}

    async processRequest(
        filter: ListUsersPayload,
    ): Promise<ListResponseData<UserEntity>> {
        const [data, count] = await this.userRepository.listUsers(filter);

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

import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    Min,
    ValidateNested,
} from 'class-validator';

import { TransformQueryNumber } from '@src/helpers/payloadDTO.helper';

export interface BaseListFilterInfo {
    limit?: number;
    pageIndex?: number;
}

export class BaseListFilterPayload implements BaseListFilterInfo {
    @TransformQueryNumber()
    @IsOptional()
    @IsNumber()
    limit?: number;

    @TransformQueryNumber()
    @IsOptional()
    @IsNumber()
    @Min(1)
    pageIndex?: number;
}

class ListResponseInfo {
    @IsNumber()
    total: number;

    @IsNumber()
    pageSize: number;

    @IsNumber()
    pageIndex: number;
}

export class BaseListResponseDTO {
    @IsNotEmpty()
    @ValidateNested()
    info: ListResponseInfo;
}

export class ListResponseData<T> extends BaseListResponseDTO {
    @IsArray()
    data: T[];
}

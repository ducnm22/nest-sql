import { Transform } from 'class-transformer';

/**
 * Query field always is string,
 * convert to number for dto field
 *
 */
export const TransformQueryNumber = () =>
    Transform(({ value }) => Number(value));

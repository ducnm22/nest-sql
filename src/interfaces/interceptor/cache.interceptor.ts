import {
    Injectable,
    Inject,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    CACHE_MANAGER,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {
        const ctx = context.switchToHttp();

        const cacheData = await this.readCache(ctx);
        if (cacheData) {
            return of(cacheData);
        }

        return next.handle().pipe(
            tap((res) => {
                this.setCache(ctx, res);
            }),
        );
    }

    private async readCache(ctx: HttpArgumentsHost) {
        const request = ctx.getRequest<Request>();
        const key = JSON.stringify(request.query);

        if (!key) {
            return;
        }

        return this.cacheManager.get(key);
    }

    private setCache(ctx: HttpArgumentsHost, res) {
        const request = ctx.getRequest<Request>();

        // only setCache from [GET] request
        if (request.method !== 'GET') {
            return;
        }

        const key = JSON.stringify(request.query);

        if (!key) {
            return;
        }

        this.cacheManager.set(key, res);
    }
}

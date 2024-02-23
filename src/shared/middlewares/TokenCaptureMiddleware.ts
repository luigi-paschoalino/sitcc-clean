import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { catchError, mergeMap } from 'rxjs/operators'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class TokenInterceptor implements NestInterceptor {
    constructor(private httpService: HttpService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest()

        const token = request.headers.authorization
        if (!token) {
            throw new BadRequestException(
                'Sem token de autorização na requisição',
            )
        }

        return this.httpService
            .post('http://localhost:3001/login/validate', { token })
            .pipe(
                mergeMap((response) => {
                    if (response.status !== 201) {
                        throw new BadRequestException('Token inválido')
                    }

                    const id = response.data.id
                    request.body.id = id

                    return next.handle()
                }),
                catchError((err) => {
                    throw new BadRequestException(err.message)
                }),
            )
    }
}

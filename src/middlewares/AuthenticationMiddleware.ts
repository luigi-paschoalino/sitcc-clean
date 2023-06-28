import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import * as jwt from 'jsonwebtoken'

const secretToken = 'sdaFsadasdaGasdCMySecretKey'

@Injectable()
export class JwtAuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const authHeader = request.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) {
            throw new UnauthorizedException()
        }

        try {
            jwt.verify(token, secretToken)
        } catch (err) {
            throw new ForbiddenException()
        }

        return true
    }
}

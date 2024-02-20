import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    ForbiddenException,
    Logger,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const secretToken = process.env.SECRET_TOKEN

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private logger = new Logger(JwtAuthGuard.name)
    // TODO: tirar o token do header e colocar no bearer
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const authHeader = request.headers.authorization
        const token = authHeader

        if (token === null) {
            throw new UnauthorizedException()
        }

        try {
            request.user = jwt.verify(token, secretToken)
            return true
        } catch (err) {
            throw new ForbiddenException(null, 'Token inválido ou expirado')
        }
    }
}

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
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const authHeader = request.headers.authorization
        const token = authHeader

        this.logger.debug(`AuthHeader: ${authHeader}\nToken: ${token}`)

        if (token === null) {
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

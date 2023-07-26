import { Inject } from '@nestjs/common'
import { AuthService, LoginToken } from '../../domain/services/Login.service'

export interface AutenticarUsecaseProps {
    email: string
    senha: string
}

export class AutenticarUsecase {
    constructor(
        @Inject('AuthService') private readonly authService: AuthService,
    ) {}

    async logar(props: AutenticarUsecaseProps): Promise<Error | LoginToken> {
        try {
            return await this.authService.logar(props)
        } catch (error) {
            return error
        }
    }
}

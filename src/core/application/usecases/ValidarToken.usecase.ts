import { Inject } from '@nestjs/common'
import { AuthService, Validation } from '../../domain/services/Login.service'

export interface ValidarTokenUsecaseProps {
    token: string
}

export class ValidarTokenUsecase {
    constructor(
        @Inject('AuthService')
        private readonly authService: AuthService,
    ) {}

    async execute(
        props: ValidarTokenUsecaseProps,
    ): Promise<Error | Validation> {
        try {
            return await this.authService.validar(props.token)
        } catch (error) {
            return error
        }
    }
}

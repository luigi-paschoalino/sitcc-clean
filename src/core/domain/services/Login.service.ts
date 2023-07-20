import { LoginDTO } from '../../application/dtos/login.dto'

export interface LoginToken {
    auth: boolean
    token?: string
}

export interface Validation {
    auth: boolean
    nome: string
}

export interface AuthService {
    logar(body: LoginDTO): Promise<Error | LoginToken>
    validar(token: string): Promise<Error | Validation>
}

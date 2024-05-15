import { LoginDTO } from '../dtos/login.dto'
import { TIPO_USUARIO } from '../Usuario'

export interface LoginToken {
    auth: boolean
    token?: string
    nome: string
    tipo: string
    id: string
}

export interface Validation {
    auth: boolean
    nome?: string
    id?: string
    tipo?: TIPO_USUARIO
}

export interface TokenInfo {
    id: string
}

export interface AuthService {
    logar(body: LoginDTO): Promise<Error | LoginToken>
    validar(token: string): Promise<Error | Validation>
    decifrar(token: string): Promise<Error | TokenInfo>
}

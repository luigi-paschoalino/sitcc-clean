import { Injectable, Inject } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { LoginDTO } from '../../application/dtos/login.dto'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import { AuthService, LoginToken } from '../../domain/services/Login.service'

const secretToken = 'sdaFsadasdaGasdCMySecretKey'

@Injectable()
export class AuthServiceImpl implements AuthService {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async logar(body: LoginDTO): Promise<Error | LoginToken> {
        try {
            const usuario = await this.usuarioRepository.buscarPorEmail(
                body.email,
            )
            if (usuario instanceof Error) throw usuario

            if (usuario.getSenha() === body.senha) {
                const token = jwt.sign(
                    {
                        id: usuario.getId(),
                        perfil: usuario.getTipo(),
                        timestamp: Date.now(),
                    },
                    secretToken,
                    {
                        expiresIn: 86400,
                    },
                )
                return { auth: true, token: token }
            }

            return { auth: false, token: null }
        } catch (error) {
            return error
        }
    }
}

import { Injectable, Inject, Logger } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { LoginDTO } from '../../application/dtos/login.dto'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import {
    AuthService,
    LoginToken,
    TokenInfo,
    Validation,
} from '../../domain/services/Login.service'
import { EncriptarSenhaService } from '../../domain/services/EncriptarSenha.service'

const secretToken = 'sdaFsadasdaGasdCMySecretKey'

@Injectable()
export class AuthServiceImpl implements AuthService {
    private logger = new Logger(AuthServiceImpl.name)

    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('EncriptarSenhaService')
        private readonly encriptarSenhaService: EncriptarSenhaService,
    ) {}

    async logar(body: LoginDTO): Promise<Error | LoginToken> {
        try {
            const usuario = await this.usuarioRepository.buscarPorEmail(
                body.email,
            )
            if (usuario instanceof Error) throw usuario

            this.logger.debug(JSON.stringify(usuario, null, 2))

            if (
                await this.encriptarSenhaService.comparar(
                    body.senha,
                    usuario.getSenha(),
                )
            ) {
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
                return {
                    auth: true,
                    token: token,
                    nome: usuario.getNome(),
                    tipo: usuario.getTipo(),
                }
            }

            return { auth: false, token: null, nome: null, tipo: null }
        } catch (error) {
            return error
        }
    }

    async validar(token: string): Promise<Error | Validation> {
        try {
            const validation = jwt.verify(token, secretToken)
            if (validation instanceof Error) throw validation

            const usuario = await this.usuarioRepository.buscarPorId(
                validation['id'],
            )

            if (usuario instanceof Error) throw usuario

            return {
                auth: true,
                nome: usuario.getNome(),
                id: usuario.getId(),
                tipo: usuario.getTipo(),
            }
        } catch (error) {
            return { auth: false }
        }
    }

    async decifrar(token: string): Promise<Error | TokenInfo> {
        try {
            const validation = jwt.verify(token, secretToken)
            if (validation instanceof Error) throw validation

            const usuario = await this.usuarioRepository.buscarPorId(
                validation['id'],
            )

            if (usuario instanceof Error) throw usuario

            return {
                id: usuario.getId(),
            }
        } catch (error) {
            return error
        }
    }
}

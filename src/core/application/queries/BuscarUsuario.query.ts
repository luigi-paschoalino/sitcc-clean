import { Inject, Injectable } from '@nestjs/common'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import { TIPO_USUARIO } from '../../domain/Usuario'

export interface UsuarioResult {
    id: string
    nome: string
    email: string
    senha: string
    curso: string
    tipo: TIPO_USUARIO
    numero: string
}

@Injectable()
export class BuscarUsuarioQuery {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async execute(id: string): Promise<Error | UsuarioResult> {
        try {
            const usuario = await this.usuarioRepository.buscarPorId(id)
            if (usuario instanceof Error) throw usuario

            const usuarioResult: UsuarioResult = {
                id: usuario.getId(),
                nome: usuario.getCurso().getNome(),
                email: usuario.getEmail(),
                senha: usuario.getSenha(),
                curso: usuario.getNome(),
                tipo: usuario.getTipo(),
                numero: usuario.getNumero(),
            }

            return usuarioResult
        } catch (error) {
            return error
        }
    }
}

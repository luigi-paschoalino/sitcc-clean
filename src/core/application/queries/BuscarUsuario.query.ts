import { Inject, Injectable } from '@nestjs/common'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import { TIPO_USUARIO } from '../../domain/Usuario'
import { CursoRepository } from '../../domain/repositories/Curso.repository'

export interface UsuarioResult {
    id: string
    nome: string
    email: string
    senha: string
    curso: {
        id: string
        nome: string
        codigo: string
    }
    tipo: TIPO_USUARIO
    numero: string
}

@Injectable()
export class BuscarUsuarioQuery {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('CursoRepository')
        private readonly cursoRepository: CursoRepository,
    ) {}

    async execute(id: string): Promise<Error | UsuarioResult> {
        try {
            const usuario = await this.usuarioRepository.buscarPorId(id)
            if (usuario instanceof Error) throw usuario

            const curso = await this.cursoRepository.buscarPorId(
                usuario.getCurso(),
            )
            if (curso instanceof Error) throw curso

            const usuarioResult: UsuarioResult = {
                id: usuario.getId(),
                nome: usuario.getNome(),
                email: usuario.getEmail(),
                senha: usuario.getSenha(),
                curso: {
                    id: curso.getId(),
                    nome: curso.getNome(),
                    codigo: curso.getCodigo(),
                },
                tipo: usuario.getTipo(),
                numero: usuario.getNumero(),
            }

            return usuarioResult
        } catch (error) {
            return error
        }
    }
}

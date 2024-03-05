import { Inject } from '@nestjs/common'
import { UsuarioRepository } from '../../../domain/repositories/Usuario.repository'

export interface AtualizarPerfilProfessorUsecaseProps {
    usuarioId: string
    descricao?: string
    link?: string
    areasAtuacao?: string[]
}

export class AtualizarPerfilProfessorUsecase {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async execute(
        props: AtualizarPerfilProfessorUsecaseProps,
    ): Promise<Error | void> {
        try {
            const usuario = await this.usuarioRepository.buscarPorId(
                props.usuarioId,
            )
            if (usuario instanceof Error) throw usuario

            const atualizar = usuario.atualizarPerfilProfessor({
                descricao: props.descricao,
                link: props.link,
                areasAtuacao: props.areasAtuacao,
            })
            if (atualizar instanceof Error) throw atualizar

            const salvar = await this.usuarioRepository.salvar(usuario)
            if (salvar instanceof Error) throw salvar
        } catch (error) {
            return error
        }
    }
}

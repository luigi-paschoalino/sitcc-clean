import { Inject } from '@nestjs/common'
import { UsuarioRepository } from '../../../domain/repositories/Usuario.repository'

export interface ExcluirProjetoUsecaseProps {
    usuarioId: string
    projetoId: string
}

export class ExcluirProjetoUsecase {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async execute(props: ExcluirProjetoUsecaseProps): Promise<Error | void> {
        try {
            const usuario = await this.usuarioRepository.buscarPorId(
                props.usuarioId,
            )
            if (usuario instanceof Error) throw usuario

            const excluir = usuario.excluirProjeto(props.projetoId)
            if (excluir instanceof Error) throw excluir

            const salvar = await this.usuarioRepository.salvar(usuario)
            if (salvar instanceof Error) throw salvar
        } catch (error) {
            return error
        }
    }
}

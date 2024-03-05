import { Inject } from '@nestjs/common'
import { UsuarioRepository } from '../../../domain/repositories/Usuario.repository'
import { Projeto } from '../../../domain/Projeto'

export interface EditarProjetoUsecaseProps {
    usuarioId: string
    projetoId: string
    titulo: string
    descricao: string
    preRequisitos: string
    disponivel: boolean
}

export class EditarProjetoUsecase {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async execute(props: EditarProjetoUsecaseProps): Promise<Error | void> {
        try {
            const usuario = await this.usuarioRepository.buscarPorId(
                props.usuarioId,
            )
            if (usuario instanceof Error) throw usuario

            const projeto = Projeto.criar({
                titulo: props.titulo,
                descricao: props.descricao,
                preRequisitos: props.preRequisitos,
                disponivel: props.disponivel,
            })
            if (projeto instanceof Error) throw projeto

            const editar = usuario.editarProjeto(projeto, props.projetoId)
            if (editar instanceof Error) throw editar

            const salvar = await this.usuarioRepository.salvar(usuario)
            if (salvar instanceof Error) throw salvar
        } catch (error) {
            return error
        }
    }
}

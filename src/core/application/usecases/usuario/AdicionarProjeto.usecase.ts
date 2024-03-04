import { Inject } from '@nestjs/common'
import { UsuarioRepository } from '../../../domain/repositories/Usuario.repository'
import { Projeto } from '../../../domain/Projeto'

export interface AdicionarProjetoUsecaseProps {
    usuarioId: string
    titulo: string
    descricao: string
    preRequisitos: string
    disponivel: boolean
}

export class AdicionarProjetoUsecase {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async execute(props: AdicionarProjetoUsecaseProps): Promise<Error | void> {
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

            const atualizar = usuario.adicionarProjeto(projeto)
            if (atualizar instanceof Error) throw atualizar

            const salvar = await this.usuarioRepository.salvar(usuario)
            if (salvar instanceof Error) throw salvar
        } catch (error) {
            return error
        }
    }
}

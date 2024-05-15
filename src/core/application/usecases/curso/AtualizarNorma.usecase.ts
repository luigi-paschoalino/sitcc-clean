import { Inject } from '@nestjs/common'
import { CursoRepository } from '../../../domain/repositories/Curso.repository'
import { Norma } from '../../../domain/Norma'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'
import { TIPO_USUARIO } from '../../../domain/Usuario'
import { UsuarioException } from '../../../../shared/domain/exceptions/Usuario.exception'

export interface AtualizarNormaUsecaseProps {
    id: string
    titulo: string
    descricao: string
    link: string
    tipoUsuario: string
}

export class AtualizarNormaUsecase {
    constructor(
        @Inject('CursoRepository')
        private readonly cursoRepository: CursoRepository,
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
    ) {}

    async execute(props: AtualizarNormaUsecaseProps): Promise<Error | void> {
        try {
            if (
                props.tipoUsuario !== TIPO_USUARIO.COORDENADOR &&
                props.tipoUsuario !== TIPO_USUARIO.ADMINISTRADOR
            )
                throw new UsuarioException('Usuário não autorizado')

            const curso = await this.cursoRepository.buscarPorId(props.id)
            if (curso instanceof Error) throw curso

            const norma = Norma.criar({
                descricao: props.descricao,
                link: props.link,
                titulo: props.titulo,
            })
            if (norma instanceof Error) throw norma

            curso.adicionarNorma(norma)

            const salvar = await this.cursoRepository.salvarCurso(curso)
            if (salvar instanceof Error) throw salvar

            await this.publisher.publish(curso)
        } catch (error) {
            return error
        }
    }
}

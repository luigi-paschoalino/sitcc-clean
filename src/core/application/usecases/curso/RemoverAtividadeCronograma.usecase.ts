import { Inject } from '@nestjs/common'
import { UsuarioException } from '../../../../shared/domain/exceptions/Usuario.exception'
import { TIPO_USUARIO } from '../../../domain/Usuario'
import { CursoRepository } from '../../../domain/repositories/Curso.repository'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'

export interface RemoverAtividadeCronogramaUsecaseProps {
    usuarioTipo: string
    cursoId: string
    cronogramaId: string
    atividadeId: string
}

export class RemoverAtividadeCronogramaUsecase {
    constructor(
        @Inject('CursoRepository')
        private readonly cursoRepository: CursoRepository,
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
    ) {}

    async execute(props: RemoverAtividadeCronogramaUsecaseProps) {
        try {
            if (props.usuarioTipo !== TIPO_USUARIO.COORDENADOR)
                throw new UsuarioException('Usuário não autorizado')

            const curso = await this.cursoRepository.buscarPorId(props.cursoId)
            if (curso instanceof Error) throw curso

            const remover = curso.removerAtividadeCronograma(
                props.cronogramaId,
                props.atividadeId,
            )
            if (remover instanceof Error) throw remover

            const salvar = await this.cursoRepository.salvarCurso(curso)
            if (salvar instanceof Error) throw salvar

            this.publisher.publish(curso)
        } catch (error) {
            return error
        }
    }
}

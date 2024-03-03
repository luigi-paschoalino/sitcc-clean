import { Inject } from '@nestjs/common'
import { UsuarioException } from '../../../../shared/domain/exceptions/Usuario.exception'
import { TIPO_USUARIO } from '../../../domain/Usuario'
import { CursoRepository } from '../../../domain/repositories/Curso.repository'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'
import { TIPO_ATIVIDADE } from '../../../domain/Atividades'
import { InvalidPropsException } from '../../../../shared/domain/exceptions/InvalidProps.exception'
import { Atividade } from '../../../domain/Atividades'

export interface EditarAtividadeCronogramaUsecaseProps {
    usuarioTipo: string
    cursoId: string
    cronogramaId: string
    atividadeId: string
    titulo: string
    descricao: string
    data: Date
}

export class EditarAtividadeCronogramaUsecase {
    constructor(
        @Inject('CursoRepository')
        private readonly cursoRepository: CursoRepository,
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
    ) {}

    async execute(props: EditarAtividadeCronogramaUsecaseProps) {
        try {
            if (props.usuarioTipo !== TIPO_USUARIO.COORDENADOR)
                throw new UsuarioException('Usuário não autorizado')

            const curso = await this.cursoRepository.buscarPorId(props.cursoId)
            if (curso instanceof Error) throw curso

            if (!Object.keys(TIPO_ATIVIDADE).includes(props.titulo))
                throw new InvalidPropsException('Tipo de atividade inválido')

            const atividade = Atividade.criar(
                {
                    titulo: props.titulo as TIPO_ATIVIDADE,
                    descricao: props.descricao,
                    data: props.data,
                },
                props.atividadeId,
            )
            if (atividade instanceof Error) throw atividade

            const editar = curso.editarAtividadeCronograma(
                props.cronogramaId,
                atividade,
            )
            if (editar instanceof Error) throw editar

            const salvar = await this.cursoRepository.salvarCurso(curso)
            if (salvar instanceof Error) throw salvar

            this.publisher.publish(curso)
        } catch (error) {
            return error
        }
    }
}

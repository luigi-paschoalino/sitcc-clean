import { Inject } from '@nestjs/common'
import { CursoRepository } from '../../../domain/repositories/Curso.repository'
import { TIPO_USUARIO } from '../../../domain/Usuario'
import { UsuarioException } from '../../../../shared/domain/exceptions/Usuario.exception'
import { Atividade, TIPO_ATIVIDADE } from '../../../domain/Atividades'
import { InvalidPropsException } from '../../../../shared/domain/exceptions/InvalidProps.exception'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'

export interface AdicionarAtividadeCronogramaUsecaseProps {
    usuarioTipo: string
    cursoId: string
    cronogramaId: string
    titulo: string
    descricao: string
    data: Date
}

export class AdicionarAtividadeCronogramaUsecase {
    constructor(
        @Inject('CursoRepository')
        private readonly cursoRepository: CursoRepository,
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
    ) {}

    async execute(props: AdicionarAtividadeCronogramaUsecaseProps) {
        try {
            if (props.usuarioTipo !== TIPO_USUARIO.COORDENADOR)
                throw new UsuarioException('Usuário não autorizado')

            if (!Object.keys(TIPO_ATIVIDADE).includes(props.titulo))
                throw new InvalidPropsException('Tipo de atividade inválido')

            const curso = await this.cursoRepository.buscarPorId(props.cursoId)
            if (curso instanceof Error) throw curso

            const atividade = Atividade.criar({
                titulo: props.titulo as TIPO_ATIVIDADE,
                descricao: props.descricao,
                data: props.data,
            })
            if (atividade instanceof Error) throw atividade

            const addAtividade = curso.adicionarAtividadeCronograma(
                props.cronogramaId,
                atividade,
            )
            if (addAtividade instanceof Error) throw addAtividade

            const salvar = await this.cursoRepository.salvarCurso(curso)
            if (salvar instanceof Error) throw salvar

            this.publisher.publish(curso)
        } catch (error) {
            return error
        }
    }
}

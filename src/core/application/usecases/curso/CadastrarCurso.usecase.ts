import { Inject, Logger } from '@nestjs/common'
import { UniqueIdService } from '../../../domain/services/UniqueID.service'
import { Curso } from '../../../domain/Curso'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'
import { CursoRepository } from '../../../domain/repositories/Curso.repository'
import { InvalidPropsException } from '../../../../shared/domain/exceptions/InvalidProps.exception'

export interface CadastrarCursoUsecaseProps {
    nome: string
    codigo: string
}

export class CadastrarCursoUsecase {
    private logger = new Logger(CadastrarCursoUsecase.name)

    constructor(
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
        @Inject('UniqueIdService')
        private readonly uniqueIdService: UniqueIdService,
        @Inject('CursoRepository')
        private readonly cursoRepository: CursoRepository,
    ) {}

    async execute(props: CadastrarCursoUsecaseProps): Promise<Error | void> {
        try {
            const cursos = await this.cursoRepository.listarCursos()
            if (cursos instanceof Error) throw cursos

            const existe = cursos.some(
                (curso) =>
                    curso.getNome() === props.nome ||
                    curso.getCodigo() === props.codigo,
            )
            if (existe)
                throw new InvalidPropsException(
                    'Já existe um curso com esse nome/código',
                )

            const curso = Curso.criar(
                {
                    nome: props.nome,
                    codigo: props.codigo,
                },
                this.uniqueIdService.gerarUuid(),
            )
            if (curso instanceof Error) {
                throw curso
            }

            const salvar = await this.cursoRepository.salvarCurso(curso)
            if (salvar instanceof Error) {
                throw salvar
            }

            await this.publisher.publish(curso)
        } catch (error) {
            return error
        }
    }
}

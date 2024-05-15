import { Inject } from '@nestjs/common'
import { InvalidPropsException } from '../../../../shared/domain/exceptions/InvalidProps.exception'
import { Curso } from '../../../domain/Curso'
import { CursoRepository } from '../../../domain/repositories/Curso.repository'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'

export interface CadastrarCursoUsecaseProps {
    nome: string
    codigo: string
}

export class CadastrarCursoUsecase {
    constructor(
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
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

            const curso = Curso.criar({
                nome: props.nome,
                codigo: props.codigo,
            })
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

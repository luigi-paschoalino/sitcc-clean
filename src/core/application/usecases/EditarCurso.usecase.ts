import { Inject, Logger } from '@nestjs/common'
import { CursoRepository } from '../../domain/repositories/Curso.repository'

export interface EditarCursoUsecaseProps {
    id: string
    nome?: string
    codigo?: string
}

export class EditarCursoUsecase {
    private logger = new Logger(EditarCursoUsecase.name)

    constructor(
        @Inject('CursoRepository')
        private readonly cursoRepository: CursoRepository,
    ) {}

    async execute(props: EditarCursoUsecaseProps): Promise<Error | any> {
        try {
            const curso = await this.cursoRepository.buscarPorId(props.id)
            if (curso instanceof Error) throw curso

            curso.editar({
                nome: props.nome,
                codigo: props.codigo,
            })

            const salvar = await this.cursoRepository.salvarCurso(curso)
            if (salvar instanceof Error) throw salvar
        } catch (error) {
            return error
        }
    }
}

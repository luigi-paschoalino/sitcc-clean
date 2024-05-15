import { Inject } from '@nestjs/common'
import { CursoRepository } from '../../../domain/repositories/Curso.repository'
import { TIPO_USUARIO } from '../../../domain/Usuario'
import { UsuarioException } from '../../../../shared/domain/exceptions/Usuario.exception'
import { Cronograma, SEMESTRE } from '../../../domain/Cronograma'

export interface AdicionarCronogramaUsecaseProps {
    cursoId: string
    ano: number
    semestre: SEMESTRE
    usuarioTipo: string
}

export class AdicionarCronogramaUsecase {
    constructor(
        @Inject('CursoRepository')
        private readonly cursoRepository: CursoRepository,
    ) {}

    async execute(props: AdicionarCronogramaUsecaseProps) {
        try {
            if (props.usuarioTipo !== TIPO_USUARIO.COORDENADOR)
                throw new UsuarioException('Usuário não autorizado')

            const curso = await this.cursoRepository.buscarPorId(props.cursoId)
            if (curso instanceof Error) throw curso

            const cronograma = Cronograma.criar({
                ano: props.ano,
                semestre: props.semestre,
            })

            const adicionar = curso.adicionarCronograma(cronograma)
            if (adicionar instanceof Error) throw adicionar

            const salvar = await this.cursoRepository.salvarCurso(curso)
            if (salvar instanceof Error) throw salvar
        } catch (error) {
            return error
        }
    }
}

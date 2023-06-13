import { Inject } from '@nestjs/common'
import { UniversidadeRepository } from '../../domain/repositories/Universidade.repository'
import { CursoDTO } from '../dtos/Curso.dto'
import { UniversidadeException } from '../../domain/exceptions/Universidade.exception'

export interface BuscarCursoQueryProps {
    cursoId: string
}

export class BuscarCursoQuery {
    constructor(
        @Inject('UniversidadeRepository')
        private readonly universidadeRepository: UniversidadeRepository,
    ) {}

    async execute(props: BuscarCursoQueryProps): Promise<Error | CursoDTO> {
        try {
            const universidade =
                await this.universidadeRepository.buscarPorCurso(props.cursoId)

            if (universidade instanceof Error) throw universidade

            const instituto = universidade.getInstitutos().find((instituto) => {
                return instituto.getCursos().find((curso) => {
                    return curso.getId() === props.cursoId
                })
            })

            if (!instituto)
                throw new UniversidadeException(
                    `Não foi possível encontrar o instituto com o ID ${props.cursoId}`,
                )

            const curso = instituto.getCursos().find((curso) => {
                return curso.getId() === props.cursoId
            })

            if (!curso)
                throw new Error(
                    `Não foi possível encontrar o curso com o ID ${props.cursoId}`,
                )

            const cursoDTO: CursoDTO = {
                id: curso.getId(),
                nome: curso.getNome(),
                codigo: curso.getCodigo(),
                instituto: {
                    id: instituto.getId(),
                    nome: instituto.getNome(),
                    universidade: {
                        id: universidade.getId(),
                        nome: universidade.getNome(),
                    },
                },
            }

            return cursoDTO
        } catch (error) {
            return error
        }
    }
}

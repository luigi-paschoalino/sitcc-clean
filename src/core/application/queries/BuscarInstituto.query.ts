import { Inject } from '@nestjs/common'
import { UniversidadeRepository } from '../../domain/repositories/Universidade.repository'
import { InstitutoDTO } from '../dtos/Instituto.dto'

export interface BuscarInstitutoQueryProps {
    institutoId: string
}

export class BuscarInstitutoQuery {
    constructor(
        @Inject('UniversidadeRepository')
        private readonly universidadeRepository: UniversidadeRepository,
    ) {}

    async execute(
        props: BuscarInstitutoQueryProps,
    ): Promise<Error | InstitutoDTO> {
        try {
            const universidade =
                await this.universidadeRepository.buscarPorInstitutoId(
                    props.institutoId,
                )

            if (universidade instanceof Error) throw universidade

            const instituto = universidade
                .getInstitutos()
                .find((instituto) => instituto.getId() === props.institutoId)

            if (!instituto)
                throw new Error(
                    `Não foi possível encontrar o instituto com o ID ${props.institutoId}`,
                )

            const institutoDTO: InstitutoDTO = {
                id: instituto.getId(),
                nome: instituto.getNome(),
                universidade: {
                    id: universidade.getId(),
                    nome: universidade.getNome(),
                },
                //TODO: implementar essa parte do DTO após criar Curso
                // cursos: instituto.getCursos().map(curso => ({
                //     id: curso.getId(),
                //     nome: curso.getNome(),
                // }))
            }

            return institutoDTO
        } catch (error) {
            return error
        }
    }
}

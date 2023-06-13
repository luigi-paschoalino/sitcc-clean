import { Inject } from '@nestjs/common'
import { UniversidadeDTO } from '../dtos/Universidade.dto'
import { UniversidadeRepository } from '../../domain/repositories/Universidade.repository'

export class ListarUniversidadesQuery {
    constructor(
        @Inject('UniversidadeRepository')
        private readonly universidadeRepository: UniversidadeRepository,
    ) {}

    async execute(): Promise<Error | UniversidadeDTO[]> {
        try {
            const result =
                await this.universidadeRepository.listarUniversidades()

            if (result instanceof Error) throw result

            const universidadesDTO: UniversidadeDTO[] = result.map(
                (universidade) => {
                    return {
                        id: universidade.getId(),
                        nome: universidade.getNome(),
                        institutos: universidade.getInstitutos().map((i) => {
                            return {
                                id: i.getId(),
                                nome: i.getNome(),
                                cursos: i.getCursos().map((c) => {
                                    return {
                                        id: c.getId(),
                                        nome: c.getNome(),
                                        codigo: c.getCodigo(),
                                    }
                                }),
                            }
                        }),
                    }
                },
            )

            return universidadesDTO
        } catch (error) {
            return error
        }
    }
}

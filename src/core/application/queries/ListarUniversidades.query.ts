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
                    }
                },
            )

            return universidadesDTO
        } catch (error) {
            return error
        }
    }
}

import { UniversidadeDTO } from './../dtos/Universidade.dto'
import { Inject } from '@nestjs/common'
import { UniversidadeRepository } from '../../domain/repositories/Universidade.repository'

export class BuscarUniversidadeQuery {
    constructor(
        @Inject('UniversidadeRepository')
        private readonly universidadeRepository: UniversidadeRepository,
    ) {}

    async execute(id: string): Promise<Error | UniversidadeDTO> {
        try {
            const universidade = await this.universidadeRepository.buscarPorId(
                id,
            )

            if (universidade instanceof Error) throw universidade

            const universidadeDTO: UniversidadeDTO = {
                id: universidade.getId(),
                nome: universidade.getNome(),
                institutos: universidade.getInstitutos().map((i) => {
                    return {
                        id: i.getId(),
                        nome: i.getNome(),
                    }
                }),
            }

            return universidadeDTO
        } catch (error) {
            return error
        }
    }
}

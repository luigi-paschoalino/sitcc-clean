import { Inject } from '@nestjs/common'
import { TfgRepository } from '../../domain/repositories/Tfg.repository'
import { BancaDTOMapper } from '../mappers/BancaDTO.mapper'
import { BancaDTO } from '../../domain/dtos/Banca.dto'

export interface BuscarCursoQueryProps {
    id: string
}

export class BuscarCursoQuery {
    constructor(
        @Inject('TfgRepository')
        private readonly tfgRepository: TfgRepository,
        private readonly bancaMapper: BancaDTOMapper,
    ) {}

    async execute(props: BuscarCursoQueryProps): Promise<Error | BancaDTO> {
        try {
            const tfg = await this.tfgRepository.buscarTfg(props.id)

            if (tfg instanceof Error) throw tfg

            const bancaDTO = this.bancaMapper.toDTO(
                tfg.getBanca(),
                tfg.getId(),
                tfg.getTitulo(),
            )
            return bancaDTO
        } catch (error) {
            return error
        }
    }
}

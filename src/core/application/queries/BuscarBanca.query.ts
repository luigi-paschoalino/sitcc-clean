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
            const curso = await this.tfgRepository.buscarTfg(props.id)

            if (curso instanceof Error) throw curso

            const cursoDTO = this.bancaMapper.toDTO(curso.getBanca())
            return cursoDTO
        } catch (error) {
            return error
        }
    }
}

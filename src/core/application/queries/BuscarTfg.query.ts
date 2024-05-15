import { Inject, Injectable } from '@nestjs/common'
import { TfgDTO } from '../../domain/dtos/Tfg.dto'
import { TfgRepository } from '../../domain/repositories/Tfg.repository'

@Injectable()
export class BuscarTfgQuery {
    constructor(
        @Inject('TfgRepository')
        private readonly tfgRepository: TfgRepository,
    ) {}

    async execute(id: string): Promise<Error | TfgDTO> {
        try {
            const tfg = await this.tfgRepository.buscarTfgBFF(id)
            if (tfg instanceof Error) throw tfg

            return tfg
        } catch (error) {
            return error
        }
    }
}

import { Inject, Injectable } from '@nestjs/common'
import { Tfg } from '../../domain/Tfg'
import { TfgDTO } from '../../domain/dtos/Tcc.dto'
import { InvalidPropsException } from '../../domain/exceptions/InvalidProps.exception'
import { TccRepository } from '../../domain/repositories/Tcc.repository'

@Injectable()
export class BuscarTccQuery {
    constructor(
        @Inject('TccRepository')
        private readonly tccRepository: TccRepository,
    ) {}

    async execute(id: string): Promise<Error | TfgDTO> {
        try {
            const tcc = await this.tccRepository.buscarTcc(id)
            if (tcc instanceof Error) throw tcc

            const tccResult: TfgDTO = {
                id: tcc.getId(),
                titulo: tcc.getTitulo(),
                palavrasChave: tcc.getPalavrasChave(),
                introducao: tcc.getIntroducao(),
                objetivos: tcc.getObjetivos(),
                bibliografia: tcc.getBibliografia(),
                metodologia: tcc.getMetodologia(),
                resultados: tcc.getResultados(),
                notaParcial: tcc.getNotaParcial(),
                notaFinal: tcc.getNotaFinal(),
            }

            return tccResult
        } catch (error) {
            return error
        }
    }
}

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
            const tfg = await this.tfgRepository.buscarTfg(id)
            if (tfg instanceof Error) throw tfg

            const tfgResult: TfgDTO = {
                id: tfg.getId(),
                titulo: tfg.getTitulo(),
                palavrasChave: tfg.getPalavrasChave(),
                introducao: tfg.getIntroducao(),
                objetivos: tfg.getObjetivos(),
                bibliografia: tfg.getBibliografia(),
                descricaoMetodologia: tfg.getDescricaoMetodologia(),
                tecnicaPesquisa: tfg.getTecnicaPesquisa(),
                metodoPesquisa: tfg.getMetodoPesquisa(),
                resultadosEsperados: tfg.getResultados(),
                status: tfg.getStatus(),
                notaParcial: tfg.getNotaParcial(),
                notaFinal: tfg.getNotaFinal(),
            }

            return tfgResult
        } catch (error) {
            return error
        }
    }
}

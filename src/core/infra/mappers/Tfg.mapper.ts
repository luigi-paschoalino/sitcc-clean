import { Injectable } from '@nestjs/common'
import { STATUS_TFG, Tfg } from 'src/core/domain/Tfg'
import { BancaMapper } from './Banca.mapper'
import { TfgInfraDTO as TfgModel } from '../../../shared/infra/database/prisma/dtos/Tfg.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class TfgMapper {
    constructor(private readonly bancaMapper: BancaMapper) {}

    domainToModel(tfg: Tfg): TfgModel {
        return {
            id: tfg.getId(),
            alunoId: tfg.getAluno(),
            orientadorId: tfg.getOrientador(),
            coorientadorId: tfg.getCoorientador(),
            bibliografia: tfg.getBibliografia(),
            palavrasChave: tfg.getPalavrasChave(),
            introducao: tfg.getIntroducao(),
            metodoPesquisa: tfg.getMetodoPesquisa(),
            tecnicaPesquisa: tfg.getTecnicaPesquisa(),
            descricaoMetodologia: tfg.getDescricaoMetodologia(),
            objetivos: tfg.getObjetivos(),
            resultados: tfg.getResultados(),
            titulo: tfg.getTitulo(),
            status: tfg.getStatus(),
            notaFinal: tfg.getNotaFinal()
                ? new Prisma.Decimal(tfg.getNotaFinal())
                : null,
            notaParcial: tfg.getNotaParcial()
                ? new Prisma.Decimal(tfg.getNotaParcial())
                : null,
            path: tfg.getPath(),
            banca: tfg
                .getBanca()
                ?.map((banca) =>
                    this.bancaMapper.domainToModel(banca, tfg.getId()),
                ),
        }
    }

    modelToDomain(tfgModel: TfgModel): Tfg {
        const domain = Tfg.carregar(
            {
                bibliografia: tfgModel.bibliografia,
                titulo: tfgModel.titulo,
                introducao: tfgModel.introducao,
                metodoPesquisa: tfgModel.metodoPesquisa,
                tecnicaPesquisa: tfgModel.tecnicaPesquisa,
                descricaoMetodologia: tfgModel.descricaoMetodologia,
                notaFinal: Number(tfgModel.notaFinal),
                notaParcial: Number(tfgModel.notaParcial),
                objetivos: tfgModel.objetivos,
                palavrasChave: tfgModel.palavrasChave,
                resultadosEsperados: tfgModel.resultados,
                status: tfgModel.status as STATUS_TFG,
                aluno: tfgModel.alunoId,
                orientador: tfgModel.orientadorId,
                coorientador: tfgModel.coorientadorId,
                banca: tfgModel.banca.map((banca) =>
                    this.bancaMapper.modelToDomain(banca),
                ),
                path: tfgModel.path,
            },
            tfgModel.id,
        )

        return domain
    }
}

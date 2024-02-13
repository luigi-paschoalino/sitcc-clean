import { Injectable } from '@nestjs/common'
import { STATUS_TFG, Tfg } from 'src/core/domain/Tfg'
import { BancaMapper } from './Banca.mapper'
import { TfgInfraDTO as TfgModel } from '../../../shared/infra/database/prisma/dtos/Tcc.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class TccMapper {
    constructor(private readonly bancaMapper: BancaMapper) {}

    domainToModel(tcc: Tfg): TfgModel {
        return {
            id: tcc.getId(),
            alunoId: tcc.getAluno(),
            orientadorId: tcc.getOrientador(),
            coorientadorId: tcc.getCoorientador(),
            bibliografia: tcc.getBibliografia(),
            palavrasChave: tcc.getPalavrasChave(),
            introducao: tcc.getIntroducao(),
            metodologia: tcc.getMetodologia(),
            objetivos: tcc.getObjetivos(),
            resultados: tcc.getResultados(),
            titulo: tcc.getTitulo(),
            status: tcc.getStatus(),
            notaFinal: new Prisma.Decimal(tcc.getNotaFinal()),
            notaParcial: new Prisma.Decimal(tcc.getNotaParcial()),
            path: tcc.getPath(),
            banca: tcc
                .getBanca()
                .map((banca) =>
                    this.bancaMapper.domainToModel(banca, tcc.getId()),
                ),
        }
    }

    modelToDomain(tccModel: TfgModel): Tfg {
        const domain = Tfg.carregar(
            {
                bibliografia: tccModel.bibliografia,
                titulo: tccModel.titulo,
                introducao: tccModel.introducao,
                metodologia: tccModel.metodologia,
                notaFinal: Number(tccModel.notaFinal),
                notaParcial: Number(tccModel.notaParcial),
                objetivos: tccModel.objetivos,
                palavrasChave: tccModel.palavrasChave,
                resultados: tccModel.resultados,
                status: tccModel.status as STATUS_TFG,
                aluno: tccModel.alunoId,
                orientador: tccModel.orientadorId,
                coorientador: tccModel.coorientadorId,
                banca: tccModel.banca.map((banca) =>
                    this.bancaMapper.modelToDomain(banca),
                ),
                path: tccModel.path,
            },
            tccModel.id,
        )

        return domain
    }
}

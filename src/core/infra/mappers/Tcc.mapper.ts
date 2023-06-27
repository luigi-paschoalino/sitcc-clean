import { Injectable } from '@nestjs/common'
import { Usuario } from '../../domain/Usuario'
import { UsuarioModel } from '../models/Usuario.model'
import { Tcc } from 'src/core/domain/Tcc'
import { TccModel } from '../models/Tcc.model'

@Injectable()
export class TccMapper {
    constructor() {}

    domainToModel(tcc: Tcc): TccModel {
        const model = TccModel.create({
            bibliografia: tcc.getBibliografia(),
            titulo: tcc.getTitulo(),
            id: tcc.getId(),
            introducao: tcc.getIntroducao(),
            metodologia: tcc.getMetodologia(),
            nota_final: tcc.getNotaFinal(),
            nota_parcial: tcc.getNotaParcial(),
            objetivos: tcc.getObjetivos(),
            palavras_chave: tcc.getPalavrasChave(),
            resultados: tcc.getResultados(),
            status: tcc.getStatus(),
        })

        return model
    }

    modelToDomain(tccModel: TccModel): Tcc {
        const domain = Tcc.carregar(
            {
                bibliografia: tccModel.bibliografia,
                titulo: tccModel.titulo,
                introducao: tccModel.introducao,
                metodologia: tccModel.metodologia,
                nota_final: tccModel.nota_final,
                nota_parcial: tccModel.nota_parcial,
                objetivos: tccModel.objetivos,
                palavras_chave: tccModel.palavras_chave,
                resultados: tccModel.resultados,
                status: tccModel.status,
                aluno: tccModel.alunoId,
                orientador: tccModel.orientadorId,
            },
            tccModel.id,
        )

        return domain
    }
}

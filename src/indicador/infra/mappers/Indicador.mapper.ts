import { Injectable } from '@nestjs/common'
import { Indicador as IndicadorModel } from '@prisma/client'
import { Indicador } from '../../domain/Indicador'

@Injectable()
export class IndicadorMapper {
    constructor() {}

    public modelToDomain(model: IndicadorModel): Indicador {
        const domain = Indicador.carregar(
            {
                orientacoesRecusadas: model.orientacoesRecusadas,
                quantidadeAprovacoes: model.quantidadeAprovacoes,
                quantidadeReprovacoes: model.quantidadeReprovacoes,
                quantidadeTfgs: model.quantidadeTfgs,
                entregasFinaisRealizadas: model.entregasFinais,
                entregasParciaisRealizadas: model.entregasParciaisRealizadas,
                entregasParciaisAprovadas: model.entregasParciaisAprovadas,
                orientacoesAceitas: model.orientacoesAceitas,
                orientacaoPendente: model.orientacaoPendente,
            },
            model.id,
        )

        return domain
    }

    public domainToModel(domain: Indicador): IndicadorModel {
        return {
            id: domain.getId(),
            orientacoesRecusadas: domain.getOrientacoesRecusadas(),
            quantidadeAprovacoes: domain.getQuantidadeAprovacoes(),
            quantidadeReprovacoes: domain.getQuantidadeReprovacoes(),
            quantidadeTfgs: domain.getQuantidadeTfgs(),
            entregasFinais: domain.getEntregasFinaisRealizadas(),
            entregasParciaisRealizadas: domain.getEntregasParciaisRealizadas(),
            entregasParciaisAprovadas: domain.getEntregasParciaisAprovadas(),
            orientacoesAceitas: domain.getOrientacoesAceitas(),
            orientacaoPendente: domain.getOrientacaoPendente(),
        }
    }
}

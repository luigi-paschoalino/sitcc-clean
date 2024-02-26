import { Inject } from '@nestjs/common'
import { IndicadorRepository } from '../../domain/repositories/Indicador.repository'
import { IndicadorDTO } from '../../domain/dtos/Indicador.dto'

export class BuscarIndicadorQuery {
    constructor(
        @Inject('IndicadorRepository')
        private readonly indicadorRepository: IndicadorRepository,
    ) {}

    async execute(): Promise<Error | IndicadorDTO> {
        try {
            const indicador = await this.indicadorRepository.buscar()
            if (indicador instanceof Error) throw indicador

            return {
                quantidadeTfgs: indicador.getQuantidadeTfgs(),
                quantidadeAprovacoes: indicador.getQuantidadeAprovacoes(),
                quantidadeReprovacoes: indicador.getQuantidadeReprovacoes(),
                orientacoesRecusadas: indicador.getOrientacoesRecusadas(),
                orientacoesAceitas: indicador.getOrientacoesAceitas(),
                entregasParciaisRealizadas:
                    indicador.getEntregasParciaisRealizadas(),
                entregasParciaisAprovadas:
                    indicador.getEntregasParciaisAprovadas(),
                entregasFinaisRealizadas:
                    indicador.getEntregasFinaisRealizadas(),
                orientacaoPendente: indicador.getOrientacaoPendente(),
            }
        } catch (error) {
            return error
        }
    }
}

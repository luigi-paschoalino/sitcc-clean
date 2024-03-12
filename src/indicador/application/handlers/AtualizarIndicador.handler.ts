import { Inject } from '@nestjs/common'
import { EventsHandler } from '@nestjs/cqrs'
import { TfgCadastradoEvent } from '../../../core/domain/events/TfgCadastrado.event'
import { TfgFinalizadoEvent } from '../../../core/domain/events/TfgFinalizado.event'
import { TfgOrientacaoRecusadaEvent } from '../../../core/domain/events/TfgOrientacaoRecusada.event'
import { IndicadorRepository } from '../../domain/repositories/Indicador.repository'
import { ListarTfgService } from '../../domain/services/ListarTfg.service'
import { TfgNotaParcialAvaliadaEvent } from '../../../core/domain/events/TfgNotaParcialAvaliada.event'
import { TfgOrientacaoAprovadaEvent } from '../../../core/domain/events/TfgOrientacaoAprovada.event'
import { TfgEnviadoEvent } from '../../../core/domain/events/TfgEnviado.event'

@EventsHandler(
    TfgCadastradoEvent,
    TfgOrientacaoRecusadaEvent,
    TfgFinalizadoEvent,
    TfgNotaParcialAvaliadaEvent,
    TfgOrientacaoAprovadaEvent,
    TfgEnviadoEvent,
)
export class AtualizarIndicadorHandler {
    constructor(
        @Inject('IndicadorRepository')
        private readonly indicadorRepository: IndicadorRepository,
        @Inject('ListarTfgService')
        private readonly listarTfgService: ListarTfgService,
    ) {}

    async handle() {
        try {
            const indicador = await this.indicadorRepository.buscar()
            if (indicador instanceof Error) throw indicador

            const informacoesTfgs = await this.listarTfgService.execute()
            if (informacoesTfgs instanceof Error) throw informacoesTfgs

            const atualizar = indicador.atualizar(informacoesTfgs)
            if (atualizar instanceof Error) throw atualizar

            const salvar = await this.indicadorRepository.salvar(indicador)
            if (salvar instanceof Error) throw salvar
        } catch (error) {
            return error
        }
    }
}

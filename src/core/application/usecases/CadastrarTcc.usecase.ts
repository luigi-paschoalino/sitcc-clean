import { CommandHandler, EventBus } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { Tcc } from '../../domain/Tcc'
import { STATUS_TCC } from '../../domain/Tcc'
import { UniqueIdService } from '../../domain/services/UniqueID.service'
import { TccRepository } from '../../domain/repositories/Tcc.repository'

export interface CadastrarTccUsecaseProps {
    id: string
    status: STATUS_TCC
    titulo: string
    palavras_chave: string[]
    introducao: string
    objetivos: string
    bibliografia: string
    metodologia: string
    resultados: string
    nota_parcial?: number
    nota_final?: number
}

export class CadastrarTccUsecase {
    constructor(
        @Inject('UniqueIdService')
        private readonly uniqueIdService: UniqueIdService,
        @Inject('TccRepository')
        private readonly tccRepository: TccRepository,
    ) {}

    async execute(props: CadastrarTccUsecaseProps): Promise<Error | void> {
        try {
            const uuid = this.uniqueIdService.gerarUuid()

            const tcc = Tcc.criar(
                {
                    titulo: props.titulo,
                    palavras_chave: props.palavras_chave,
                    introducao: props.introducao,
                    objetivos: props.objetivos,
                    bibliografia: props.bibliografia,
                    metodologia: props.metodologia,
                    resultados: props.resultados,
                },
                uuid,
            )

            const salvar = await this.tccRepository.salvarTcc(tcc)
            if (salvar instanceof Error) throw salvar
        } catch (error) {
            return error
        }
    }
}

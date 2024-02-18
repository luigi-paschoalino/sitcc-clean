import { Inject } from '@nestjs/common'
import { TIPO_USUARIO } from 'src/core/domain/Usuario'
import { UsuarioException } from 'src/core/domain/exceptions/Usuario.exception'
import { TfgRepository } from 'src/core/domain/repositories/Tfg.repository'
import { UsuarioRepository } from 'src/core/domain/repositories/Usuario.repository'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'

export interface AvaliarNotaFinalUsecaseProps {
    id: string
    tccId: string
    notaApresentacao: number
    notaTrabalho: number
}

export class AvaliarNotaFinalUsecase {
    constructor(
        @Inject('TfgRepository') private readonly tccRepository: TfgRepository,
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
    ) {}

    async execute(props: AvaliarNotaFinalUsecaseProps): Promise<Error | void> {
        try {
            const professor = await this.usuarioRepository.buscarPorId(props.id)
            if (professor instanceof Error) throw professor

            if (professor.getTipo() !== TIPO_USUARIO.PROFESSOR)
                throw new UsuarioException('Usuário não é um professor')

            const tcc = await this.tccRepository.buscarTfg(props.tccId)
            if (tcc instanceof Error) throw tcc

            const aplicar_nota = tcc.avaliarNotaFinalBanca(
                props.id,
                props.notaApresentacao,
                props.notaTrabalho,
            )
            if (aplicar_nota instanceof Error) throw aplicar_nota

            const salvar = await this.tccRepository.salvarTfg(tcc)
            if (salvar instanceof Error) throw salvar

            await this.publisher.publish(tcc)
        } catch (error) {
            return error
        }
    }
}

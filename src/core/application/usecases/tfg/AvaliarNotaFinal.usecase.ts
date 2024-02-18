import { Inject } from '@nestjs/common'
import { TIPO_USUARIO } from 'src/core/domain/Usuario'
import { UsuarioException } from 'src/core/domain/exceptions/Usuario.exception'
import { TfgRepository } from 'src/core/domain/repositories/Tfg.repository'
import { UsuarioRepository } from 'src/core/domain/repositories/Usuario.repository'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'

export interface AvaliarNotaFinalUsecaseProps {
    id: string
    tfgId: string
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

            const tfg = await this.tccRepository.buscarTfg(props.tfgId)
            if (tfg instanceof Error) throw tfg

            const aplicar_nota = tfg.avaliarNotaFinalBanca(
                props.id,
                props.notaApresentacao,
                props.notaTrabalho,
            )
            if (aplicar_nota instanceof Error) throw aplicar_nota

            const salvar = await this.tccRepository.salvarTfg(tfg)
            if (salvar instanceof Error) throw salvar

            await this.publisher.publish(tfg)
        } catch (error) {
            return error
        }
    }
}

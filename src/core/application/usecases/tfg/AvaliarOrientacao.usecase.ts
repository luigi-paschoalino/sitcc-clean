import { Inject } from '@nestjs/common'
import { TfgRepository } from '../../../domain/repositories/Tfg.repository'
import { UsuarioRepository } from '../../../domain/repositories/Usuario.repository'
import { TIPO_USUARIO } from '../../../domain/Usuario'
import { UsuarioException } from '../../../domain/exceptions/Usuario.exception'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'

export interface AvaliarOrientacaoUsecaseProps {
    professorId: string
    tfgId: string
    status: boolean
    justificativa?: string
}

export class AvaliarOrientacaoUsecase {
    constructor(
        @Inject('TfgRepository') private readonly tfgRepository: TfgRepository,
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
    ) {}

    async execute(props: AvaliarOrientacaoUsecaseProps): Promise<Error | void> {
        try {
            const professor = await this.usuarioRepository.buscarPorId(
                props.professorId,
            )
            if (professor instanceof Error) throw professor
            if (professor.getTipo() !== TIPO_USUARIO.PROFESSOR)
                throw new UsuarioException('Usuário não é um professor')

            const tfg = await this.tfgRepository.buscarTfg(props.tfgId)
            if (tfg instanceof Error) throw tfg

            const avaliar = tfg.avaliarOrientacao(
                professor.getId(),
                props.status,
                props.justificativa,
            )
            if (avaliar instanceof Error) throw avaliar

            const salvar = this.tfgRepository.salvarTfg(tfg)
            if (salvar instanceof Error) throw salvar

            await this.publisher.publish(tfg)
        } catch (error) {
            return error
        }
    }
}

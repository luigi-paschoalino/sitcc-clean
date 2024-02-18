import { Inject, Logger } from '@nestjs/common'
import { TfgRepository } from '../../../domain/repositories/Tfg.repository'
import { UsuarioRepository } from '../../../domain/repositories/Usuario.repository'
import { EventPublisher } from '@nestjs/cqrs'
import { TIPO_USUARIO } from 'src/core/domain/Usuario'
import { UsuarioException } from 'src/core/domain/exceptions/Usuario.exception'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'

export interface AvaliarNotaParcialUsecaseProps {
    professorId: string
    tccId: string
    nota: number
}

export class AvaliarNotaParcialUsecase {
    private logger = new Logger(AvaliarNotaParcialUsecase.name)
    constructor(
        @Inject('TfgRepository') private readonly tccRepository: TfgRepository,
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
    ) {}

    async execute(
        props: AvaliarNotaParcialUsecaseProps,
    ): Promise<Error | void> {
        try {
            const professor = await this.usuarioRepository.buscarPorId(
                props.professorId,
            )

            this.logger.debug(JSON.stringify(professor, null, 2))

            if (professor instanceof Error) throw professor
            if (professor.getTipo() !== TIPO_USUARIO.PROFESSOR)
                throw new UsuarioException('Usuário não é um professor')

            const tcc = await this.tccRepository.buscarTfg(props.tccId)
            if (tcc instanceof Error) throw tcc

            const aplicar_nota = tcc.avaliarNotaParcial(
                props.professorId,
                props.nota,
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

import { Inject } from '@nestjs/common'
import { TccRepository } from '../../domain/repositories/Tcc.repository'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import { EventPublisher } from '@nestjs/cqrs'
import { TIPO_USUARIO } from 'src/core/domain/Usuario'
import { UsuarioException } from 'src/core/domain/exceptions/Usuario.exception'
import { EventPublisherService } from '../../domain/services/EventPublisher.service'

export interface AvaliarNotaParcialUsecaseProps {
    professorId: string
    tccId: string
    nota: number
}

export class AvaliarNotaParcialUsecase {
    constructor(
        @Inject('TccRepository') private readonly tccRepository: TccRepository,
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
            if (professor instanceof Error) throw professor
            if (professor.getTipo() !== TIPO_USUARIO.PROFESSOR)
                throw new UsuarioException('Usuário não é um professor')

            const tcc = await this.tccRepository.buscarTcc(props.tccId)
            if (tcc instanceof Error) throw tcc

            const aplicar_nota = tcc.avaliarNotaParcial(
                props.professorId,
                props.nota,
            )
            if (aplicar_nota instanceof Error) throw aplicar_nota

            const salvar = await this.tccRepository.salvarTcc(tcc)
            if (salvar instanceof Error) throw salvar

            await this.publisher.publish(tcc)
        } catch (error) {
            return error
        }
    }
}

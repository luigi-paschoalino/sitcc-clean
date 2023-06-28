import { Inject } from '@nestjs/common'
import { TccRepository } from '../../domain/repositories/Tcc.repository'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import { EventPublisher } from '@nestjs/cqrs'
import { TIPO_USUARIO } from '../../domain/Usuario'
import { UsuarioException } from '../../domain/exceptions/Usuario.exception'

export interface AvaliarOrientacaoUsecaseProps {
    professorId: string
    tccId: string
    status: boolean
    justificativa?: string
}

export class AvaliarOrientacaoUsecase {
    constructor(
        @Inject('TccRepository') private readonly tccRepository: TccRepository,
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        private readonly eventPublisher: EventPublisher,
    ) {}

    async execute(props: AvaliarOrientacaoUsecaseProps): Promise<Error | void> {
        try {
            const professor = await this.usuarioRepository.buscarPorId(
                props.professorId,
            )
            if (professor instanceof Error) throw professor
            if (professor.getTipo() !== TIPO_USUARIO.PROFESSOR)
                throw new UsuarioException('Usuário não é um professor')

            const tcc = await this.tccRepository.buscarTcc(props.tccId)
            if (tcc instanceof Error) throw tcc

            const avaliar = tcc.avaliarOrientacao(
                professor.getId(),
                props.status,
                props.justificativa,
            )
            if (avaliar instanceof Error) throw avaliar

            const salvar = this.tccRepository.salvarTcc(tcc)
            if (salvar instanceof Error) throw salvar

            this.eventPublisher.mergeObjectContext(tcc)
            tcc.commit()
        } catch (error) {
            return error
        }
    }
}

import { Inject, Logger } from '@nestjs/common'
import { Tcc } from '../../domain/Tcc'
import { UniqueIdService } from '../../domain/services/UniqueID.service'
import { TccRepository } from '../../domain/repositories/Tcc.repository'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import { EventPublisherService } from '../../domain/services/EventPublisher.service'

export interface CadastrarTccUsecaseProps {
    aluno: string
    orientador: string
    coorientador: string
}

export class CadastrarTccUsecase {
    private logger = new Logger(CadastrarTccUsecase.name)

    constructor(
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
        @Inject('UniqueIdService')
        private readonly uniqueIdService: UniqueIdService,
        @Inject('TccRepository')
        private readonly tccRepository: TccRepository,
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async execute(props: CadastrarTccUsecaseProps): Promise<Error | void> {
        // TODO: descomentar o setPerfilProfessor no usuário e verificar erro no agregado Usuario junto ao TCC (not null constraint)
        try {
            const uuid = this.uniqueIdService.gerarUuid()

            const aluno = await this.usuarioRepository.buscarPorId(props.aluno)
            if (aluno instanceof Error) throw aluno

            this.logger.debug(aluno)

            const orientador = await this.usuarioRepository.buscarPorId(
                props.orientador,
            )
            if (orientador instanceof Error) throw orientador

            const coorientador = await this.usuarioRepository.buscarPorId(
                props.coorientador,
            )
            if (coorientador instanceof Error) throw coorientador

            const tcc = Tcc.criar(
                {
                    aluno: aluno,
                    orientador: orientador,
                    coorientador: coorientador ?? null,
                },
                uuid,
            )

            if (tcc instanceof Error) throw tcc

            const salvar = await this.tccRepository.salvarTcc(tcc)
            if (salvar instanceof Error) throw salvar

            await this.publisher.publish(tcc)
        } catch (error) {
            return error
        }
    }
}

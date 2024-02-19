import { Inject, Logger } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'
import { Banca } from 'src/core/domain/Banca'
import { TfgRepository } from 'src/core/domain/repositories/Tfg.repository'
import { UniqueIdService } from 'src/core/domain/services/UniqueID.service'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'
import { UsuarioRepository } from '../../../domain/repositories/Usuario.repository'
import { TIPO_USUARIO } from '../../../domain/Usuario'
import { UsuarioException } from '../../../domain/exceptions/Usuario.exception'

export interface CadastrarBancaUsecaseProps {
    usuarioId: string
    professorId: string
    segundoProfessorId: string
    dia_hora: Date
    tfgId: string
}

export class CadastrarBancaUsecase {
    private logger = new Logger(CadastrarBancaUsecase.name)

    constructor(
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
        @Inject('UniqueIdService')
        private readonly uniqueIdService: UniqueIdService,
        @Inject('TfgRepository')
        private readonly tfgRepository: TfgRepository,
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async execute(props: CadastrarBancaUsecaseProps): Promise<Error | void> {
        try {
            const usuario = await this.usuarioRepository.buscarPorId(
                props.usuarioId,
            )
            if (usuario instanceof Error) throw usuario
            if (usuario.getTipo() !== TIPO_USUARIO.COORDENADOR)
                throw new UsuarioException('Usuário não é um coordenador')

            const professoresExistem =
                await this.usuarioRepository.buscarPorIds([
                    props.professorId,
                    props.segundoProfessorId,
                ])
            if (professoresExistem instanceof Error) throw professoresExistem

            const uuid = this.uniqueIdService.gerarUuid()
            const banca = Banca.criar(
                {
                    professorId: props.professorId,
                    data: props.dia_hora,
                    segundoProfessorId: props.segundoProfessorId,
                },
                uuid,
            )

            this.logger.debug(JSON.stringify(banca, null, 2))

            if (banca instanceof Error) throw banca

            const tfg = await this.tfgRepository.buscarTfg(props.tfgId)
            if (tfg instanceof Error) throw tfg

            this.logger.debug(JSON.stringify(tfg, null, 2))

            tfg.atribuirBanca(banca)

            this.logger.debug(JSON.stringify(tfg, null, 2))

            const salvar = await this.tfgRepository.salvarTfg(tfg)
            if (salvar instanceof Error) throw salvar

            await this.publisher.publish(tfg)
        } catch (error) {
            return error
        }
    }
}

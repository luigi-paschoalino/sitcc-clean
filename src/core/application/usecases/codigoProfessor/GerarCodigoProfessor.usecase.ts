import { CodigoProfessor } from '../../../domain/CodigoProfessor'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'
import { GerarCodigoService } from '../../../domain/services/GerarCodigo.service'
import { UniqueIdService } from '../../../domain/services/UniqueID.service'
import { CodigoProfessorRepository } from '../../../domain/repositories/CodigoProfessor.repository'
import { Inject, Logger } from '@nestjs/common'
import { UsuarioRepository } from '../../../domain/repositories/Usuario.repository'
import { TIPO_USUARIO } from '../../../domain/Usuario'
import { UsuarioException } from '../../../../shared/domain/exceptions/Usuario.exception'
import { InvalidPropsException } from '../../../../shared/domain/exceptions/InvalidProps.exception'

export type GerarCodigoProfessorUsecaseProps = {
    usuarioId: string
    professorId: string
}

export class GerarCodigoProfessorUsecase {
    private logger = new Logger(GerarCodigoProfessorUsecase.name)

    constructor(
        @Inject('CodigoProfessorRepository')
        private readonly codigoProfessorRepository: CodigoProfessorRepository,
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
        @Inject('UniqueIdService')
        private readonly uniqueIdService: UniqueIdService,
        @Inject('GerarCodigoService')
        private readonly gerarCodigoService: GerarCodigoService,
    ) {}

    async execute(
        props: GerarCodigoProfessorUsecaseProps,
    ): Promise<Error | string> {
        try {
            const usuario = await this.usuarioRepository.buscarPorId(
                props.usuarioId,
            )
            if (usuario instanceof Error) throw usuario

            if (usuario.getTipo() !== TIPO_USUARIO.ADMINISTRADOR)
                return new UsuarioException('Usuário não é um administrador')

            if (!props.professorId)
                return new InvalidPropsException(
                    'É necessário informar o ID do professor',
                )

            const professor = await this.usuarioRepository.buscarPorId(
                props.professorId,
            )
            if (professor instanceof Error) return professor

            const id = this.uniqueIdService.gerarUuid()

            const codigo = this.gerarCodigoService.gerarCodigo()

            const codigoProfessor = CodigoProfessor.criar({
                codigo,
                id,
            })

            this.logger.debug(JSON.stringify(codigoProfessor, null, 2))

            const salvar = await this.codigoProfessorRepository.salvarCodigo(
                codigoProfessor,
            )
            if (salvar instanceof Error) throw salvar

            const publish = await this.publisher.publish(codigoProfessor)
            if (publish instanceof Error) throw publish
        } catch (error) {
            return error
        }
    }
}

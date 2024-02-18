import { Inject, Logger } from '@nestjs/common'
import { Tfg } from '../../../domain/Tfg'
import { UniqueIdService } from '../../../domain/services/UniqueID.service'
import { TfgRepository } from '../../../domain/repositories/Tfg.repository'
import { UsuarioRepository } from '../../../domain/repositories/Usuario.repository'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'
import { Usuario } from 'src/core/domain/Usuario'

export interface CadastrarTfgUsecaseProps {
    aluno: string
    orientador: string
    coorientador?: string
}

export class CadastrarTfgUsecase {
    private logger = new Logger(CadastrarTfgUsecase.name)

    constructor(
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
        @Inject('UniqueIdService')
        private readonly uniqueIdService: UniqueIdService,
        @Inject('TfgRepository')
        private readonly tccRepository: TfgRepository,
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async execute(props: CadastrarTfgUsecaseProps): Promise<Error | void> {
        // TODO: descomentar o setPerfilProfessor no usuário e verificar erro no agregado Usuario junto ao TCC (not null constraint)
        try {
            const uuid = this.uniqueIdService.gerarUuid()

            const aluno = await this.usuarioRepository.buscarPorId(props.aluno)
            if (aluno instanceof Error) throw aluno

            this.logger.debug(aluno)

            if (props.orientador === props.coorientador)
                throw new Error(
                    'Orientador e coorientador não podem ser iguais',
                )

            const orientador = await this.usuarioRepository.buscarPorId(
                props.orientador,
            )
            if (orientador instanceof Error) throw orientador

            let coorientador: Usuario

            if (props.coorientador?.trim()) {
                const busca = await this.usuarioRepository.buscarPorId(
                    props.coorientador,
                )
                if (busca instanceof Error) throw busca
                coorientador = busca
            }

            const tcc = Tfg.criar(
                {
                    aluno: aluno,
                    orientador: orientador,
                    coorientador: coorientador ?? null,
                },
                uuid,
            )

            if (tcc instanceof Error) throw tcc

            const salvar = await this.tccRepository.salvarTfg(tcc)
            if (salvar instanceof Error) throw salvar

            await this.publisher.publish(tcc)
        } catch (error) {
            return error
        }
    }
}

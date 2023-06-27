import { CommandHandler, EventBus, EventPublisher } from '@nestjs/cqrs'
import { Inject, Logger } from '@nestjs/common'
import { Tcc } from '../../domain/Tcc'
import { UniqueIdService } from '../../domain/services/UniqueID.service'
import { TccRepository } from '../../domain/repositories/Tcc.repository'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'

export interface CadastrarTccUsecaseProps {
    aluno: string
    orientador: string
    titulo: string
    palavras_chave: string[]
    introducao: string
    objetivos: string
    bibliografia: string
    metodologia: string
    resultados: string
}

export class CadastrarTccUsecase {
    private logger = new Logger(CadastrarTccUsecase.name)

    constructor(
        private readonly eventPublisher: EventPublisher,
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

            const tcc = Tcc.criar(
                {
                    aluno: aluno,
                    orientador: orientador,
                    titulo: props.titulo,
                    palavras_chave: props.palavras_chave,
                    introducao: props.introducao,
                    objetivos: props.objetivos,
                    bibliografia: props.bibliografia,
                    metodologia: props.metodologia,
                    resultados: props.resultados,
                },
                uuid,
            )

            if (tcc instanceof Error) throw tcc

            const salvar = await this.tccRepository.salvarTcc(tcc)
            if (salvar instanceof Error) throw salvar

            this.eventPublisher.mergeObjectContext(tcc)
            tcc.commit()
        } catch (error) {
            return error
        }
    }
}

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
    titulo: string
    palavrasChave: string
    introducao: string
    objetivos: string
    bibliografia: string
    metodoPesquisa: string
    tecnicaPesquisa: string
    descricaoMetodologia: string
    resultadosEsperados: string
}

export class CadastrarTfgUsecase {
    private logger = new Logger(CadastrarTfgUsecase.name)

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

    async execute(props: CadastrarTfgUsecaseProps): Promise<Error | void> {
        // TODO: descomentar o setPerfilProfessor no usuário e verificar erro no agregado Usuario junto ao TCC (not null constraint)
        try {
            const uuid = this.uniqueIdService.gerarUuid()

            const aluno = await this.usuarioRepository.buscarPorId(props.aluno)
            if (aluno instanceof Error) throw aluno

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

            const tfg = Tfg.criar(
                {
                    aluno: aluno,
                    orientador: orientador,
                    coorientador: coorientador ?? null,
                    titulo: props.titulo,
                    palavrasChave: props.palavrasChave,
                    introducao: props.introducao,
                    objetivos: props.objetivos,
                    bibliografia: props.bibliografia,
                    metodoPesquisa: props.metodoPesquisa,
                    tecnicaPesquisa: props.tecnicaPesquisa,
                    descricaoMetodologia: props.descricaoMetodologia,
                    resultadosEsperados: props.resultadosEsperados,
                },
                uuid,
            )

            if (tfg instanceof Error) throw tfg

            const salvar = await this.tfgRepository.salvarTfg(tfg)
            if (salvar instanceof Error) throw salvar

            await this.publisher.publish(tfg)
        } catch (error) {
            return error
        }
    }
}

import { Inject } from '@nestjs/common'
import { TIPO_USUARIO, Usuario } from '../../../domain/Usuario'
import { Tfg } from '../../../domain/Tfg'
import { TfgRepository } from '../../../domain/repositories/Tfg.repository'
import { UsuarioRepository } from '../../../domain/repositories/Usuario.repository'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'
import { UsuarioException } from '../../../../shared/domain/exceptions/Usuario.exception'
import { InvalidPropsException } from '../../../../shared/domain/exceptions/InvalidProps.exception'

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
    constructor(
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
        @Inject('TfgRepository')
        private readonly tfgRepository: TfgRepository,
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async execute(props: CadastrarTfgUsecaseProps): Promise<Error | void> {
        try {
            const aluno = await this.usuarioRepository.buscarPorId(props.aluno)
            if (aluno instanceof Error) throw aluno
            if (aluno.getTipo() !== TIPO_USUARIO.ALUNO)
                throw new UsuarioException('Usuário não é um aluno')

            const tfgAtivo = await this.tfgRepository.listarTfgs(true, {
                alunoId: aluno.getId(),
            })
            if (tfgAtivo instanceof Error) throw tfgAtivo
            if (tfgAtivo.length > 0)
                throw new UsuarioException(
                    'O aluno já possui um TFG ativo cadastrado',
                )

            const orientador = await this.usuarioRepository.buscarPorId(
                props.orientador,
            )
            if (orientador instanceof Error) throw orientador
            if (orientador.getTipo() !== TIPO_USUARIO.PROFESSOR)
                throw new InvalidPropsException(
                    'O orientador selecionado não é um professor',
                )

            let coorientador: Usuario

            if (props.coorientador?.trim()) {
                const busca = await this.usuarioRepository.buscarPorId(
                    props.coorientador,
                )
                if (busca instanceof Error) throw busca
                if (busca.getTipo() !== TIPO_USUARIO.PROFESSOR)
                    throw new InvalidPropsException(
                        'O coorientador selecionado não é um professor',
                    )
                coorientador = busca
            }

            const tfg = Tfg.criar({
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
            })

            if (tfg instanceof Error) throw tfg

            const salvar = await this.tfgRepository.salvarTfg(tfg)
            if (salvar instanceof Error) throw salvar

            await this.publisher.publish(tfg)
        } catch (error) {
            return error
        }
    }
}

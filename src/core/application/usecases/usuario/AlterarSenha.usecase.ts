import { Inject, Logger } from '@nestjs/common'
import { UsuarioRepository } from '../../../domain/repositories/Usuario.repository'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'
import { EncriptarSenhaService } from '../../../domain/services/EncriptarSenha.service'
import { InvalidPropsException } from '../../../../shared/domain/exceptions/InvalidProps.exception'

export interface AlterarSenhaUsecaseProps {
    id: string
    hashRecuperacaoSenha: string
    senha: string
    confirmarSenha: string
}

export class AlterarSenhaUsecase {
    private logger = new Logger(AlterarSenhaUsecase.name)

    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
        @Inject('EncriptarSenhaService')
        private readonly encriptarSenhaService: EncriptarSenhaService,
    ) {}

    async execute(props: AlterarSenhaUsecaseProps): Promise<Error | void> {
        try {
            const usuario = await this.usuarioRepository.buscarPorId(props.id)
            if (usuario instanceof Error) throw usuario

            if (props.senha !== props.confirmarSenha)
                throw new InvalidPropsException('As senhas não conferem')

            const senhaHash = await this.encriptarSenhaService.encriptar(
                props.senha,
            )

            const alterarSenha = usuario.alterarSenha(
                senhaHash,
                props.hashRecuperacaoSenha,
            )
            if (alterarSenha instanceof Error) throw alterarSenha

            const salvar = await this.usuarioRepository.salvar(usuario)
            if (salvar instanceof Error) throw salvar

            await this.publisher.publish(usuario)
        } catch (error) {
            return error
        }
    }
}

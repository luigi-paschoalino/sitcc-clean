import { Inject } from '@nestjs/common'
import { InvalidPropsException } from '../../../../shared/domain/exceptions/InvalidProps.exception'
import { UsuarioException } from '../../../../shared/domain/exceptions/Usuario.exception'
import { TIPO_USUARIO } from '../../../domain/Usuario'
import { TfgRepository } from '../../../domain/repositories/Tfg.repository'
import { UsuarioRepository } from '../../../domain/repositories/Usuario.repository'
import { EventPublisherService } from '../../../domain/services/EventPublisher.service'

export interface EditarBancaUsecaseProps {
    tfgId: string
    professorId?: string
    segundoProfessorId?: string
    data?: Date
    usuarioTipo: string
}

export class EditarBancaUsecase {
    constructor(
        @Inject('TfgRepository')
        private readonly tfgRepository: TfgRepository,
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('EventPublisherService')
        private readonly publisher: EventPublisherService,
    ) {}

    async execute(props: EditarBancaUsecaseProps): Promise<void> {
        try {
            if (props.usuarioTipo !== TIPO_USUARIO.COORDENADOR)
                throw new UsuarioException('O usuário não possui permissões')

            const usuarios = await this.usuarioRepository.buscarPorIds(
                [props.professorId, props.segundoProfessorId].filter(
                    (id) => id,
                ),
            )
            if (usuarios instanceof Error) throw usuarios

            const usuariosNaoProfessores = usuarios.filter(
                (usuario) => usuario.getTipo() !== TIPO_USUARIO.PROFESSOR,
            )
            if (usuariosNaoProfessores.length > 0)
                throw new InvalidPropsException(
                    `Os seguintes usuários não são professores: ${usuariosNaoProfessores
                        .map((usuario) => usuario.getId())
                        .join(', ')}`,
                )

            const tfg = await this.tfgRepository.buscarTfg(props.tfgId)
            if (tfg instanceof Error) throw tfg

            const editarBanca = tfg.editarBanca(props)
            if (editarBanca instanceof Error) throw editarBanca

            const salvar = await this.tfgRepository.salvarTfg(tfg)
            if (salvar instanceof Error) throw salvar

            await this.publisher.publish(tfg)
        } catch (error) {
            return error
        }
    }
}

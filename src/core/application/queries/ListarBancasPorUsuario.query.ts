import { Inject } from '@nestjs/common'
import { TfgRepository } from '../../domain/repositories/Tfg.repository'
import { BancaDTOMapper } from '../mappers/BancaDTO.mapper'
import { BancaDTO } from '../../domain/dtos/Banca.dto'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import { TIPO_USUARIO } from '../../domain/Usuario'
import { UsuarioException } from '../../../shared/domain/exceptions/Usuario.exception'

export interface ListarBancasPorUsuarioQueryProps {
    usuarioId: string
}

export class ListarBancasPorUsuarioQuery {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('TfgRepository')
        private readonly tfgRepository: TfgRepository,
        private readonly bancaMapper: BancaDTOMapper,
    ) {}

    async execute(
        props: ListarBancasPorUsuarioQueryProps,
    ): Promise<Error | BancaDTO[]> {
        try {
            const usuario = await this.usuarioRepository.buscarPorId(
                props.usuarioId,
            )
            if (usuario instanceof Error) throw usuario
            if (usuario.getTipo() === TIPO_USUARIO.ALUNO)
                throw new UsuarioException(
                    'Usuário não pode visualizar as bancas',
                )

            const tfgs = await this.tfgRepository.listarTfgs(
                true,
                usuario.getTipo() === TIPO_USUARIO.PROFESSOR
                    ? {
                          bancaProfessorId: props.usuarioId,
                      }
                    : undefined,
            )

            if (tfgs instanceof Error) throw tfgs

            const bancasDTO = tfgs.map((tfg) =>
                this.bancaMapper.toDTO(
                    tfg.getBanca(),
                    tfg.getId(),
                    tfg.getTitulo(),
                ),
            )
            return bancasDTO
        } catch (error) {
            return error
        }
    }
}

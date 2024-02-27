import { Inject, Logger } from '@nestjs/common'
import { UsuarioDTO } from '../../domain/dtos/Usuario.dto'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import { UsuarioDTOMapper } from '../mappers/UsuarioDTO.mapper'

type BuscarUsuarioHashResponse = UsuarioDTO

export class BuscarUsuarioHashQuery {
    private logger = new Logger(BuscarUsuarioHashQuery.name)

    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        private readonly usuarioMapper: UsuarioDTOMapper,
    ) {}

    async execute(hash: string): Promise<Error | BuscarUsuarioHashResponse> {
        try {
            const usuario = await this.usuarioRepository.buscarPorHashSenha(
                hash,
            )

            if (usuario instanceof Error) throw usuario

            this.logger.debug(JSON.stringify(usuario, null, 2))
            const usuarioDTO = this.usuarioMapper.toDTO(usuario)

            return usuarioDTO
        } catch (error) {
            return error
        }
    }
}

import { Logger, Inject } from '@nestjs/common'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'

export class BuscarUsuarioHash {
    private logger = new Logger(BuscarUsuarioHash.name)

    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async execute(hash: string) {
        try {
            const usuario = await this.usuarioRepository.buscarPorHashSenha(
                hash,
            )

            if (usuario instanceof Error) throw usuario

            return usuario
        } catch (error) {
            return error
        }
    }
}

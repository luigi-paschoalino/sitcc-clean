import { Inject } from '@nestjs/common'
import { CodigoProfessorDTO } from '../../../domain/dtos/CodigoProfessor.dto'
import { CodigoProfessorRepository } from '../../../domain/repositories/CodigoProfessor.repository'
import { UsuarioRepository } from '../../../domain/repositories/Usuario.repository'
import { TIPO_USUARIO } from '../../../domain/Usuario'
import { UsuarioException } from '../../../../shared/domain/exceptions/Usuario.exception'

export type ListarCodigosProfessorQueryProps = {
    usuarioId: string
}

export class ListarCodigosProfessorQuery {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('CodigoProfessorRepository')
        private readonly codigoProfessorRepository: CodigoProfessorRepository,
    ) {}

    async execute(
        props: ListarCodigosProfessorQueryProps,
    ): Promise<Error | CodigoProfessorDTO[]> {
        try {
            const usuario = await this.usuarioRepository.buscarPorId(
                props.usuarioId,
            )
            if (usuario instanceof Error) return usuario
            if (usuario.getTipo() !== TIPO_USUARIO.ADMINISTRADOR)
                return new UsuarioException('Usuário não autorizado')

            const codigos = await this.codigoProfessorRepository.listarCodigos()
            if (codigos instanceof Error) return codigos

            const codigosDTO: CodigoProfessorDTO[] = codigos.map((codigo) => ({
                codigo: codigo.getCodigo(),
                disponivel: codigo.getDisponivel(),
                email: codigo.getEmail(),
            }))
            return codigosDTO
        } catch (error) {
            return error
        }
    }
}

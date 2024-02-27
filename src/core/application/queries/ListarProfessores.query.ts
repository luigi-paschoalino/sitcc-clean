import { Inject } from '@nestjs/common'
import { TIPO_USUARIO } from 'src/core/domain/Usuario'
import { UsuarioRepository } from 'src/core/domain/repositories/Usuario.repository'
import { ProfessoresDTO } from '../../domain/dtos/Professores.dto'

export class ListarProfessoresQuery {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async execute() {
        try {
            const professores = await this.usuarioRepository.buscarPorTipo(
                TIPO_USUARIO.PROFESSOR,
            )
            if (professores instanceof Error) throw professores

            const professoresDTO: ProfessoresDTO[] = professores.map(
                (professor) => {
                    return {
                        id: professor.getId(),
                        nome: professor.getNome(),
                    }
                },
            )
            return professoresDTO
        } catch (error) {
            return error
        }
    }
}

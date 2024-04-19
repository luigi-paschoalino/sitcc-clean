import { Inject } from '@nestjs/common'
import { TfgRepository } from '../../domain/repositories/Tfg.repository'
import { TIPO_USUARIO } from '../../domain/Usuario'
import { TfgDTO } from '../../domain/dtos/Tfg.dto'

export interface ListarTfgsPorUsuarioQueryProps {
    tipoUsuario: string
    usuarioId: string
}

export class ListarTfgsPorUsuarioQuery {
    constructor(
        @Inject('TfgRepository')
        private readonly tfgRepository: TfgRepository,
    ) {}

    async execute(
        props: ListarTfgsPorUsuarioQueryProps,
    ): Promise<Error | TfgDTO[]> {
        try {
            /* Aluno busca apenas o TFG ativo,
            orientador busca todos os TFGs que ele orienta e
            coordenador/administrador busca todos os TFGs */
            const tfgs = await this.tfgRepository.listarTfgsBFF(
                props.tipoUsuario === TIPO_USUARIO.PROFESSOR ? true : false,
                props.tipoUsuario === TIPO_USUARIO.ALUNO
                    ? { alunoId: props.usuarioId }
                    : props.tipoUsuario === TIPO_USUARIO.PROFESSOR
                    ? { orientadorId: props.usuarioId }
                    : {},
            )
            if (tfgs instanceof Error) throw tfgs

            return tfgs
        } catch (error) {
            return error
        }
    }
}

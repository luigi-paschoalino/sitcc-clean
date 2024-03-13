import { Inject } from '@nestjs/common'
import { Tfg } from '../../domain/Tfg'
import { BuscarTfgService } from '../../domain/services/BuscarTfg.service'
import { PrismaService } from '../../../shared/infra/database/prisma/prisma.service'
import { RepositoryDataNotFoundException } from '../../../shared/domain/exceptions/RepositoryDataNotFound.exception'

export class BuscarTfgServiceImpl implements BuscarTfgService {
    constructor(
        @Inject('PrismaService')
        private readonly prismaService: PrismaService,
    ) {}

    async buscar(id: string): Promise<Error | Tfg> {
        try {
            const tfg = await this.prismaService.tfg.findUnique({
                where: {
                    id,
                },
                include: {
                    aluno: true,
                    orientador: true,
                    coorientador: true,
                },
            })

            if (!tfg)
                throw new RepositoryDataNotFoundException('TFG não encontrado')

            const domain = Tfg.criar(
                {
                    aluno: {
                        email: tfg.aluno.email,
                        nome: tfg.aluno.nome,
                    },
                    orientador: {
                        nome: tfg.orientador.nome,
                        email: tfg.orientador.email,
                    },
                    coorientador: tfg.coorientador
                        ? {
                              nome: tfg.coorientador.nome,
                              email: tfg.coorientador.email,
                          }
                        : undefined,
                    titulo: tfg.titulo,
                    notaParcial: Number(tfg.notaParcial),
                    notaFinal: Number(tfg.notaFinal),
                },
                tfg.id,
            )
            return domain
        } catch (error) {
            return error
        }
    }
}

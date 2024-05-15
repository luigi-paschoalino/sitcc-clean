import { Inject } from '@nestjs/common'
import { CarregarIndicadorProps } from '../../domain/Indicador'
import { ListarTfgService } from '../../domain/services/ListarTfg.service'
import { PrismaService } from '../../../shared/infra/database/prisma/prisma.service'
import { RepositoryDataNotFoundException } from '../../../shared/domain/exceptions/RepositoryDataNotFound.exception'

export class ListarTfgServiceImpl implements ListarTfgService {
    constructor(
        @Inject('PrismaService')
        private readonly prismaService: PrismaService,
    ) {}
    async execute(): Promise<Error | CarregarIndicadorProps> {
        try {
            const tfgs = await this.prismaService.tfg.findMany()
            if (tfgs.length === 0)
                return new RepositoryDataNotFoundException(
                    'Nenhum TFG cadastrado',
                )

            return {
                quantidadeTfgs: tfgs.length,
                quantidadeAprovacoes: tfgs.filter(
                    (tfg) => tfg.status === 'APROVADO',
                ).length,
                quantidadeReprovacoes: tfgs.filter(
                    (tfg) => tfg.status === 'REPROVADO',
                ).length,
                orientacoesRecusadas: tfgs.filter(
                    (tfg) => tfg.status === 'ORIENTACAO_RECUSADA',
                ).length,
                entregasFinaisRealizadas: tfgs.filter(
                    (tfg) => tfg.status === 'ENTREGA_FINAL',
                ).length,
                entregasParciaisRealizadas: tfgs.filter(
                    (tfg) => tfg.status === 'ENTREGA_PARCIAL_REALIZADA',
                ).length,
                entregasParciaisAprovadas: tfgs.filter(
                    (tfg) => tfg.status === 'ENTREGA_PARCIAL_APROVADA',
                ).length,
                orientacoesAceitas: tfgs.filter(
                    (tfg) => tfg.status === 'ORIENTACAO_ACEITA',
                ).length,
                orientacaoPendente: tfgs.filter(
                    (tfg) => tfg.status === 'MATRICULA_REALIZADA',
                ).length,
            }
        } catch (error) {
            return error
        }
    }
}

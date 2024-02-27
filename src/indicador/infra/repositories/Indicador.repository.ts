import { Inject } from '@nestjs/common'
import { PrismaService } from '../../../shared/infra/database/prisma/prisma.service'
import { Indicador } from '../../domain/Indicador'
import { IndicadorRepository } from '../../domain/repositories/Indicador.repository'
import { IndicadorMapper } from '../mappers/Indicador.mapper'

export class IndicadorRepositoryImpl implements IndicadorRepository {
    constructor(
        @Inject('PrismaService')
        private readonly prisma: PrismaService,
        private readonly mapper: IndicadorMapper,
    ) {}

    async buscar(): Promise<Error | Indicador> {
        try {
            const model = await this.prisma.indicador.findFirst()
            if (!model) return new Error('Indicador não encontrado')

            const domain = this.mapper.modelToDomain(model)

            return domain
        } catch (error) {
            return error
        }
    }

    async salvar(indicador: Indicador): Promise<void | Error> {
        try {
            const model = this.mapper.domainToModel(indicador)

            await this.prisma.indicador.upsert({
                update: model,
                create: model,
                where: { id: model.id },
            })
        } catch (error) {
            return error
        }
    }
}

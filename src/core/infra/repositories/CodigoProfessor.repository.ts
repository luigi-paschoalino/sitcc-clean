import { Inject, Injectable } from '@nestjs/common'
import { CodigoProfessor } from '../../domain/CodigoProfessor'
import { RepositoryDataNotFoundException } from '../../../shared/domain/exceptions/RepositoryDataNotFound.exception'
import { CodigoProfessorRepository } from '../../domain/repositories/CodigoProfessor.repository'
import { CodigoProfessorMapper } from '../mappers/CodigoProfessor.mapper'
import { PrismaService } from '../../../shared/infra/database/prisma/prisma.service'

@Injectable()
export class CodigoProfessorRepositoryImpl
    implements CodigoProfessorRepository
{
    constructor(
        @Inject('PrismaService') private readonly prismaService: PrismaService,
        private readonly codigoProfessorMapper: CodigoProfessorMapper,
    ) {}

    async buscarCodigo(codigo: string): Promise<Error | CodigoProfessor> {
        try {
            const model = await this.prismaService.codigoProfessor.findUnique({
                where: { codigo },
            })
            if (!model)
                return new RepositoryDataNotFoundException(
                    'Não foi encontrado nenhum código com esse valor!',
                )

            const codigoProfessor =
                this.codigoProfessorMapper.modelToDomain(model)

            return codigoProfessor
        } catch (error) {
            return error
        }
    }

    async salvarCodigo(codigo: CodigoProfessor): Promise<Error | void> {
        try {
            const model = this.codigoProfessorMapper.domainToModel(codigo)

            await this.prismaService.codigoProfessor.upsert({
                where: { codigo: model.codigo },
                update: model,
                create: model,
            })
        } catch (error) {
            return error
        }
    }
}

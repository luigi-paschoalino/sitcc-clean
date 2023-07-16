import { Injectable } from '@nestjs/common'
import { CodigoProfessor } from '../../domain/CodigoProfessor'
import { RepositoryDataNotFoundException } from '../../domain/exceptions/RepositoryDataNotFound.exception'
import { CodigoProfessorRepository } from '../../domain/repositories/CodigoProfessor.repository'
import { CodigoProfessorMapper } from '../mappers/CodigoProfessor.mapper'
import { CodigoProfessorModel } from '../models/CodigoProfessor.model'

@Injectable()
export class CodigoProfessorRepositoryImpl
    implements CodigoProfessorRepository
{
    constructor(
        private readonly codigoProfessorMapper: CodigoProfessorMapper,
    ) {}

    async buscarCodigo(codigo: string): Promise<Error | CodigoProfessor> {
        try {
            const model = await CodigoProfessorModel.findOne({
                where: { codigo },
            })
            if (!model)
                throw new RepositoryDataNotFoundException(
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

            await CodigoProfessorModel.save(model)
        } catch (error) {
            return error
        }
    }
}

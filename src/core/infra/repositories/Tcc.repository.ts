import { Injectable } from '@nestjs/common'
import { TccRepository } from '../../domain/repositories/Tcc.repository'
import { Tcc } from '../../domain/Tcc'
import { TccModel } from '../models/Tcc.model'
import { RepositoryException } from '../../domain/exceptions/Repository.exception'
import { RepositoryDataNotFoundException } from '../../domain/exceptions/RepositoryDataNotFound.exception'
import { TccMapper } from '../mappers/Tcc.mapper'

@Injectable()
export class TccRepositoryImpl implements TccRepository {
    constructor(private readonly tccMapper: TccMapper) {}

    async buscarTcc(id: string): Promise<Error | Tcc> {
        try {
            const model = await TccModel.findOneBy({ id })

            if (model instanceof Error)
                throw new RepositoryException(model.stack)
            else if (!model)
                throw new RepositoryDataNotFoundException(
                    `TCC com ID ${id} não existe!`,
                )
            const tcc = this.tccMapper.modelToDomain(model)
            return tcc
        } catch (error) {
            return error
        }
    }

    async salvarTcc(tcc: Tcc): Promise<Error | void> {
        try {
            const tccModel = this.tccMapper.domainToModel(tcc)

            const tccSalvar = await tccModel.save()

            if (tccSalvar instanceof Error)
                throw new RepositoryException(tccSalvar.stack)

            return
        } catch (error) {
            return error
        }
    }
}

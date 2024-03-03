import { Curso } from '../../domain/Curso'
import { CursoInfraDTO } from '../../../shared/infra/database/prisma/dtos/Curso.dto'
import { CronogramaMapper } from './Cronograma.mapper'
import { NormaMapper } from './Norma.mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CursoMapper {
    constructor(
        private readonly normaMapper: NormaMapper,
        private readonly cronogramaMapper: CronogramaMapper,
    ) {}

    domainToModel(domain: Curso): Error | CursoInfraDTO {
        const cronogramas = this.cronogramaMapper.domainToModelList(
            domain.getCronogramas(),
            domain.getId(),
        )
        if (cronogramas instanceof Error) return cronogramas

        return {
            id: domain.getId(),
            nome: domain.getNome(),
            codigo: domain.getCodigo(),
            cronogramas,
            normas: domain
                .getNormas()
                ?.map((norma) =>
                    this.normaMapper.domainToModel(norma, domain.getId()),
                ),
        }
    }

    modelToDomain(model: CursoInfraDTO): Error | Curso {
        const normasDomain = model.normas?.map((norma) =>
            this.normaMapper.modelToDomain(norma),
        )
        const cronogramas = model.cronogramas
            ? this.cronogramaMapper.modelToDomainList(model.cronogramas)
            : []
        if (cronogramas instanceof Error) return cronogramas

        const domain = Curso.carregar(
            {
                nome: model.nome,
                codigo: model.codigo,
                normas: normasDomain ?? [],
                cronogramas,
            },
            model.id,
        )
        return domain
    }

    modelToDomainList(modelList: CursoInfraDTO[]): Error | Curso[] {
        const domain = modelList.map((curso) => {
            const cursoDomain = this.modelToDomain(curso)
            if (cursoDomain instanceof Error) return cursoDomain
            return cursoDomain
        })

        return domain as Curso[]
    }
}

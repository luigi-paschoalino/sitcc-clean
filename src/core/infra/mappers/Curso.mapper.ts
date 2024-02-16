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

    domainToModel(domain: Curso): CursoInfraDTO {
        return {
            id: domain.getId(),
            nome: domain.getNome(),
            codigo: domain.getCodigo(),
            cronogramas: domain
                .getCronogramas()
                .map((cronograma) =>
                    this.cronogramaMapper.domainToModel(
                        cronograma,
                        domain.getId(),
                    ),
                ),
            normas: domain
                .getNormas()
                .map((norma) =>
                    this.normaMapper.domainToModel(norma, domain.getId()),
                ),
        }
    }

    modelToDomain(model: CursoInfraDTO): Curso {
        const normasDomain = model.normas?.map((norma) =>
            this.normaMapper.modelToDomain(norma),
        )
        const cronogramasDomain = model.cronogramas?.map((cronograma) =>
            this.cronogramaMapper.modelToDomain(cronograma),
        )

        const domain = Curso.carregar(
            {
                nome: model.nome,
                codigo: model.codigo,
                normas: normasDomain ?? [],
                cronogramas: cronogramasDomain ?? [],
            },
            model.id,
        )
        return domain
    }
}

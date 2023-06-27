import { Inject, Logger } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'
import { UniqueIdService } from '../../domain/services/UniqueID.service'
import { UniversidadeRepository } from '../../domain/repositories/Universidade.repository'
import { Curso } from '../../domain/Curso'
import { UniversidadeException } from '../../domain/exceptions/Universidade.exception'
import { Universidade } from '../../domain/Universidade'

export interface CadastrarCursoUsecaseProps {
    nome: string
    codigo: string
    institutoId: string
}

export class CadastrarCursoUsecase {
    private logger = new Logger(CadastrarCursoUsecase.name)

    constructor(
        private readonly eventPublisher: EventPublisher,
        @Inject('UniqueIdService')
        private readonly uniqueIdService: UniqueIdService,
        @Inject('UniversidadeRepository')
        private readonly universidadeRepository: UniversidadeRepository,
    ) {}

    async execute(props: CadastrarCursoUsecaseProps): Promise<Error | void> {
        try {
            const uuid = this.uniqueIdService.gerarUuid()

            const curso = Curso.criar(
                {
                    nome: props.nome,
                    codigo: props.codigo,
                },
                uuid,
            )

            if (curso instanceof Error) {
                throw curso
            }

            const universidade =
                await this.universidadeRepository.buscarPorInstitutoId(
                    props.institutoId,
                )

            if (universidade instanceof Error) {
                throw universidade
            }

            const instituto = universidade
                .getInstitutos()
                .find((instituto) => instituto.getId() === props.institutoId)

            if (!instituto) {
                throw new UniversidadeException('Instituto não encontrado')
            }

            if (
                instituto
                    .getCursos()
                    .find((c) => c.getCodigo() === props.codigo)
            ) {
                throw new UniversidadeException('Curso já cadastrado')
            }

            universidade.addCurso(instituto.getId(), curso)

            const salvar = await this.universidadeRepository.salvarUniversidade(
                universidade,
            )

            if (salvar instanceof Error) {
                throw salvar
            }

            this.eventPublisher.mergeObjectContext(universidade)
            universidade.commit()
        } catch (error) {
            return error
        }
    }
}

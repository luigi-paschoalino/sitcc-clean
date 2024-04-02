import { Banca } from '../../domain/Banca'
import { BancaDTO } from '../../domain/dtos/Banca.dto'

export class BancaDTOMapper {
    toDTO(banca: Banca, tfgId?: string): BancaDTO {
        return {
            tfgId: tfgId,
            professorId: banca.getProfessorId(),
            segundoProfessorId: banca.getSegundoProfessorId(),
            data: banca.getDiaHora(),
            notaApresentacaoProfessor:
                banca.getNotaApresentacaoProfessor() ?? null,
            notaApresentacaoSegundoProfessor:
                banca.getNotaApresentacaoSegundoProfessor() ?? null,
            notaTrabalhoProfessor: banca.getNotaTrabalhoProfessor() ?? null,
            notaTrabalhoSegundoProfessor:
                banca.getNotaTrabalhoSegundoProfessor() ?? null,
        }
    }
}

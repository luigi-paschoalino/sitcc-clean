import { Banca } from '../../domain/Banca'
import { BancaDTO } from '../../domain/dtos/Banca.dto'

export class BancaDTOMapper {
    toDTO(banca: Banca, tfgId: string, tfgNome: string): BancaDTO {
        return {
            tfgId,
            tfgNome,
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

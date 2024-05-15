export interface BancaDTO {
    tfgId: string
    tfgNome: string
    professorId: string
    segundoProfessorId: string
    data: Date
    notaApresentacaoProfessor?: number
    notaApresentacaoSegundoProfessor?: number
    notaTrabalhoProfessor?: number
    notaTrabalhoSegundoProfessor?: number
}

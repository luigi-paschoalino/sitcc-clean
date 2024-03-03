import { TIPO_ATIVIDADE } from '../Atividades'

export interface AtividadeDTO {
    id: string
    data: Date
    titulo: TIPO_ATIVIDADE
    descricao: string
}

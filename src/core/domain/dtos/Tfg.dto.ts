import { STATUS_TFG } from '../Tfg'
import { BancaDTO } from './Banca.dto'

export interface TfgDTO {
    id: string
    titulo: string
    aluno?: string
    orientador?: string
    coorientador?: string
    palavrasChave: string
    introducao: string
    objetivos: string
    bibliografia: string
    descricaoMetodologia: string
    tecnicaPesquisa: string
    metodoPesquisa: string
    resultadosEsperados: string
    status: STATUS_TFG
    notaParcial: number
    notaFinal: number
    banca?: BancaDTO
}

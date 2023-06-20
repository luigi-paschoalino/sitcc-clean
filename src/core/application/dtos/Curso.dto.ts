export interface CursoDTO {
    id: string
    nome: string
    codigo: string
    instituto: {
        id: string
        nome: string
        universidade: {
            id: string
            nome: string
        }
    }
}

export interface UniversidadeDTO {
    id: string
    nome: string
    institutos: {
        id: string
        nome: string
        cursos: {
            id: string
            nome: string
            codigo: string
        }[]
    }[]
}

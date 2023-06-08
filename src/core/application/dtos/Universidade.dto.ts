export interface UniversidadeDTO {
    id: string
    nome: string
    institutos: {
        id: string
        nome: string
    }[]
}

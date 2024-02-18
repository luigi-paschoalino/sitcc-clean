export enum TIPO_ENTREGA {
    PARCIAL = 'PARCIAL',
    FINAL = 'FINAL',
}

export interface MoverTfgServiceProps {
    tfgId: string
    path: string
    tipoEntrega: TIPO_ENTREGA
}

export interface MoverTfgService {
    execute(props: MoverTfgServiceProps): Promise<Error | string>
}

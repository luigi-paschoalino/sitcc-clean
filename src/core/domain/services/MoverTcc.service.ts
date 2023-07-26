export enum TIPO_ENTREGA {
    PARCIAL = 'PARCIAL',
    FINAL = 'FINAL',
}

export interface MoverTccServiceProps {
    tccId: string
    path: string
    tipoEntrega: TIPO_ENTREGA
}

export interface MoverTccService {
    execute(props: MoverTccServiceProps): Promise<Error | string>
}

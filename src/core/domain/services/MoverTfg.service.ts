import { TIPO_ENTREGA } from '../Tfg'

export interface MoverTfgServiceProps {
    tfgId: string
    path: string
    tipoEntrega: TIPO_ENTREGA
}

export interface MoverTfgService {
    execute(props: MoverTfgServiceProps): Promise<Error | string>
}

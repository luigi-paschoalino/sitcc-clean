export interface MoverTccServiceProps {
    tccId: string
    path: string
}

export interface MoverTccService {
    execute(props: MoverTccServiceProps): Promise<Error | void>
}

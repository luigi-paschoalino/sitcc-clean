import { InvalidPropsException } from '../../shared/domain/exceptions/InvalidProps.exception'

export interface CarregarIndicadorProps {
    quantidadeTfgs: number
    quantidadeAprovacoes: number
    quantidadeReprovacoes: number
    orientacoesRecusadas: number
    orientacoesAceitas: number
    entregasParciaisRealizadas: number
    entregasParciaisAprovadas: number
    entregasFinaisRealizadas: number
    orientacaoPendente: number
}

export class Indicador {
    private id: string
    private quantidadeTfgs: number
    private quantidadeAprovacoes: number
    private quantidadeReprovacoes: number
    private orientacoesRecusadas: number
    private orientacoesAceitas: number
    private entregasParciaisRealizadas: number
    private entregasParciaisAprovadas: number
    private entregasFinaisRealizadas: number
    private orientacaoPendente: number

    private constructor(id: string) {
        this.id = id
    }

    // TODO: validar atualização do indicador quando status dos TFGs mudar
    static carregar(props: CarregarIndicadorProps, id: string): Indicador {
        try {
            if (Object.keys(props).length === 0)
                throw new InvalidPropsException(
                    'Dados do indicador não informados',
                )

            const instance = new Indicador(id)

            instance.setQuantidadeTfgs(props.quantidadeTfgs)
            instance.setQuantidadeAprovacoes(props.quantidadeAprovacoes)
            instance.setQuantidadeReprovacoes(props.quantidadeReprovacoes)
            instance.setOrientacoesRecusadas(props.orientacoesRecusadas)
            instance.setOrientacoesAceitas(props.orientacoesAceitas)
            instance.setEntregasParciaisRealizadas(
                props.entregasParciaisRealizadas,
            )
            instance.setEntregasParciaisAprovadas(
                props.entregasParciaisAprovadas,
            )
            instance.setEntregasFinaisRealizadas(props.entregasFinaisRealizadas)
            instance.setPendenteOrientacao(props.orientacaoPendente)

            return instance
        } catch (error) {
            return error
        }
    }

    private setQuantidadeTfgs(quantidadeTfgs: number) {
        this.quantidadeTfgs = quantidadeTfgs ?? 0
    }

    private setQuantidadeAprovacoes(quantidadeAprovacoes: number) {
        this.quantidadeAprovacoes = quantidadeAprovacoes ?? 0
    }

    private setQuantidadeReprovacoes(quantidadeReprovacoes: number) {
        this.quantidadeReprovacoes = quantidadeReprovacoes ?? 0
    }

    private setOrientacoesRecusadas(orientacoesRecusadas: number) {
        this.orientacoesRecusadas = orientacoesRecusadas ?? 0
    }

    private setOrientacoesAceitas(orientacoesAprovadas: number) {
        this.orientacoesAceitas = orientacoesAprovadas ?? 0
    }

    private setEntregasParciaisRealizadas(entregasParciaisRealizadas: number) {
        this.entregasParciaisRealizadas = entregasParciaisRealizadas ?? 0
    }

    private setEntregasParciaisAprovadas(entregasParciaisAprovadas: number) {
        this.entregasParciaisAprovadas = entregasParciaisAprovadas ?? 0
    }

    private setEntregasFinaisRealizadas(entregasFinaisRealizadas: number) {
        this.entregasFinaisRealizadas = entregasFinaisRealizadas ?? 0
    }

    private setPendenteOrientacao(pendenteOrientacao: number) {
        this.orientacaoPendente = pendenteOrientacao ?? 0
    }

    atualizar(props: CarregarIndicadorProps): Error | void {
        try {
            this.setQuantidadeTfgs(props.quantidadeTfgs)
            this.setQuantidadeAprovacoes(props.quantidadeAprovacoes)
            this.setQuantidadeReprovacoes(props.quantidadeReprovacoes)
            this.setOrientacoesRecusadas(props.orientacoesRecusadas)
            this.setOrientacoesAceitas(props.orientacoesAceitas)
            this.setEntregasParciaisRealizadas(props.entregasParciaisRealizadas)
            this.setEntregasParciaisAprovadas(props.entregasParciaisAprovadas)
            this.setEntregasFinaisRealizadas(props.entregasFinaisRealizadas)
            this.setPendenteOrientacao(props.orientacaoPendente)
        } catch (error) {
            return error
        }
    }

    getId(): string {
        return this.id
    }

    getQuantidadeTfgs(): number {
        return this.quantidadeTfgs
    }

    getQuantidadeAprovacoes(): number {
        return this.quantidadeAprovacoes
    }

    getQuantidadeReprovacoes(): number {
        return this.quantidadeReprovacoes
    }

    getOrientacoesRecusadas(): number {
        return this.orientacoesRecusadas
    }

    getOrientacoesAceitas(): number {
        return this.orientacoesAceitas
    }

    getEntregasParciaisRealizadas(): number {
        return this.entregasParciaisRealizadas
    }

    getEntregasParciaisAprovadas(): number {
        return this.entregasParciaisAprovadas
    }

    getEntregasFinaisRealizadas(): number {
        return this.entregasFinaisRealizadas
    }

    getOrientacaoPendente(): number {
        return this.orientacaoPendente
    }
}

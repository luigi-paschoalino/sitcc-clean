import { TIPO_USUARIO } from '../Usuario'
import { AbstractEvent } from './AbstractEvent'

interface UsuarioCadastradoEventProps {
    id: string
    nome: string
    curso: string
    email: string
    senha: string
    tipo: TIPO_USUARIO
    numero: string
    codigo?: string
}

//TODO: como pegar um evento disparado e salvar no banco de dados?
export class UsuarioCadastradoEvent extends AbstractEvent<UsuarioCadastradoEventProps> {
    constructor(props: UsuarioCadastradoEventProps) {
        super(UsuarioCadastradoEvent.name, props)
    }
}

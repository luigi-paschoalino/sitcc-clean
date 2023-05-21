import { PerfilProfessor } from './../PerfilProfessor'
import { TIPO_USUARIO } from '../Usuario'
import { IEvent } from '@nestjs/cqrs'

interface UsuarioCadastradoEventProps {
    id: string
    nome: string
    curso: string
    email: string
    senha: string
    tipo: TIPO_USUARIO
    numero: string
}

//TODO: como pegar um evento disparado e salvar no banco de dados?
export class UsuarioCadastradoEvent implements IEvent {
    constructor(props: UsuarioCadastradoEventProps) {}
}

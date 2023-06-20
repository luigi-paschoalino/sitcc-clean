import { IEvent } from '@nestjs/cqrs'

interface UniversidadeCriadaEventProps {
    id: string
    nome: string
}

//TODO: como pegar um evento disparado e salvar no banco de dados?
export class UniversidadeCriadaEvent implements IEvent {
    constructor(props: UniversidadeCriadaEventProps) {}
}

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { TIPO_USUARIO } from '../../domain/Usuario'

@Entity({ name: 'usuario' })
export class UsuarioModel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false, length: 256 })
    nome: string

    @Column({ nullable: false, length: 256 })
    email: string

    @Column({ nullable: false, length: 256 })
    senha: string

    @Column({ nullable: false, type: 'enum', enum: TIPO_USUARIO })
    tipo: TIPO_USUARIO
}

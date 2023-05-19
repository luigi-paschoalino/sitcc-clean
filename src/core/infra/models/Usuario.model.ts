import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'usuario' })
export class UsuarioModel {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false, length: 256 })
    nome: string

    @Column({ nullable: false, length: 256 })
    email: string

    @Column({ nullable: false, length: 256 })
    senha: string

    @Column({ nullable: false, length: 256 })
    tipo: string
}

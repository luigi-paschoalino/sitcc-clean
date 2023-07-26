import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'norma' })
export class NormaModel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    titulo: string

    @Column()
    descricao: string

    @Column()
    link: string
}

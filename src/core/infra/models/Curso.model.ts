import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { InstitutoModel } from './Instituto.model'

@Entity('curso')
export class CursoModel {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false, length: 256 })
    nome: string

    @Column({ nullable: false })
    institutoId: string

    @ManyToOne(() => InstitutoModel, (instituto) => instituto.cursos)
    instituto: InstitutoModel

    @Column({ nullable: false, length: 256 })
    codigo: string
}

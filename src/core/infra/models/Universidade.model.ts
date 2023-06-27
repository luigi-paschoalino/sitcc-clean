import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    BaseEntity,
} from 'typeorm'
import { InstitutoModel } from './Instituto.model'

@Entity({ name: 'universidade' })
export class UniversidadeModel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false, length: 256, unique: true })
    nome: string

    @OneToMany(() => InstitutoModel, (instituto) => instituto.universidade, {
        cascade: true,
        eager: true,
    })
    institutos: InstitutoModel[]
}

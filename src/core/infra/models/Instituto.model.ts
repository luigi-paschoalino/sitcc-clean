import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { UniversidadeModel } from './Universidade.model'
import { CursoModel } from './Curso.model'

@Entity({ name: 'instituto' })
export class InstitutoModel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false, length: 256 })
    nome: string

    @Column({ nullable: false })
    universidadeId: string

    @ManyToOne(
        () => UniversidadeModel,
        (universidade) => universidade.institutos,
    )
    universidade: UniversidadeModel

    @OneToMany(() => CursoModel, (curso) => curso.instituto, {
        cascade: true,
        eager: true,
    })
    cursos: CursoModel[]
}

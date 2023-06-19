import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { InstitutoModel } from './Instituto.model'
import { UsuarioModel } from './Usuario.model'

@Entity('curso')
export class CursoModel extends BaseEntity {
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

    @OneToMany(() => UsuarioModel, (usuario) => usuario.curso)
    usuarios: UsuarioModel[]
}

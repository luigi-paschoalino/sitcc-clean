import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { UsuarioModel } from './Usuario.model'

@Entity({ name: 'perfil_professor' })
export class PerfilProfessorModel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    descricao: string

    @Column()
    link: string

    @OneToOne(() => UsuarioModel, (usuario) => usuario.perfilProfessor)
    @JoinColumn()
    usuario: UsuarioModel
}

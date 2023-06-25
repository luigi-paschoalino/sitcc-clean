import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { UsuarioModel } from './Usuario.model'
import { ProjetoModel } from './Projeto.model'

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

    @OneToMany(() => ProjetoModel, (projeto) => projeto.perfilProfessor, {
        eager: true,
        cascade: true,
    })
    projetos: ProjetoModel[]
}

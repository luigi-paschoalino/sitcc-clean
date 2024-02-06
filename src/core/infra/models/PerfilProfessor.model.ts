// import { ProjetoModel } from './Projeto.model'
// import { AreasAtuacao } from '../../domain/AreasAtuacao'
// import { AreasAtuacaoModel } from './AreasAtuacao.model'

// @Entity({ name: 'perfil_professor' })
// export class PerfilProfessorModel extends BaseEntity {
//     @PrimaryGeneratedColumn('uuid')
//     id: string

//     @Column()
//     descricao: string

//     @Column()
//     link: string

//     @Column({ type: 'jsonb', nullable: true })
//     areasAtuacao: AreasAtuacaoModel[]

//     @OneToOne(() => UsuarioModel, (usuario) => usuario.perfilProfessor)
//     @JoinColumn()
//     usuario: UsuarioModel

//     @OneToMany(() => ProjetoModel, (projeto) => projeto.perfilProfessor, {
//         eager: true,
//     })
//     projetos: ProjetoModel[]
// }

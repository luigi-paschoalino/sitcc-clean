// @Entity({ name: 'usuario' })
// export class UsuarioModel extends BaseEntity {
//     @PrimaryGeneratedColumn('uuid')
//     id: string

//     @Column({ nullable: false, length: 256 })
//     nome: string

//     @ManyToOne(() => CursoModel, (curso) => curso.usuarios, { eager: true })
//     curso: CursoModel

//     @Column({ nullable: false, length: 256 })
//     email: string

//     @Column({ nullable: false, length: 256 })
//     senha: string

//     @Column({ nullable: false, type: 'enum', enum: TIPO_USUARIO })
//     tipo: TIPO_USUARIO

//     @Column({ nullable: false, length: 256 })
//     numero: string

//     @Column({ nullable: true })
//     hashRecuperacaoSenha: string

//     @OneToOne(() => PerfilProfessorModel, (perfil) => perfil.usuario, {
//         eager: true,
//         cascade: true,
//     })
//     perfilProfessor: PerfilProfessorModel
// }

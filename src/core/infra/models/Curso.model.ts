import { UsuarioModel } from './Usuario.model'
import { CronogramaModel } from './Cronograma.model'

@Entity('curso')
export class CursoModel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false, length: 256 })
    nome: string

    @Column({ nullable: false, length: 256 })
    codigo: string

    @OneToMany(() => UsuarioModel, (usuario) => usuario.curso)
    usuarios: UsuarioModel[]

    @OneToMany(() => CronogramaModel, (cronograma) => cronograma.curso, {
        eager: true,
        cascade: true,
    })
    cronogramas: CronogramaModel[]
}

import { ENUM_SEMESTRE } from '../../domain/Cronograma'
import { CursoModel } from './Curso.model'
import { AtividadeModel } from './Atividade.model'

// @Entity({ name: 'cronograma' })
// export class CronogramaModel extends BaseEntity {
//     @PrimaryGeneratedColumn('uuid')
//     id: string

//     @Column({ nullable: false })
//     ano: number

//     @Column({ nullable: false, type: 'enum', enum: ENUM_SEMESTRE })
//     semestre: ENUM_SEMESTRE

//     @ManyToOne(() => CursoModel, (curso) => curso.cronogramas)
//     curso: CursoModel

//     @OneToMany(() => AtividadeModel, (atividade) => atividade.cronograma, {
//         cascade: true,
//         eager: true,
//     })
//     atividades: AtividadeModel[]
// }

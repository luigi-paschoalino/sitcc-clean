import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { TccModel } from './Tcc.model'
import { UsuarioModel } from './Usuario.model'

@Entity({ name: 'banca' })
export class BancaModel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false })
    dia_hora: Date

    @Column({ nullable: true })
    nota_final: number

    @Column({ nullable: true })
    nota_apresentacao: number

    @Column({ nullable: true })
    nota_trabalho: number

    @ManyToOne(() => TccModel, (tcc) => tcc.banca)
    tcc: TccModel

    @Column()
    professorId: string

    @ManyToOne(() => UsuarioModel)
    @JoinColumn({ name: 'professorId' })
    professor: UsuarioModel
}
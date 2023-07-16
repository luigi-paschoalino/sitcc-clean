import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    OneToMany,
    BaseEntity,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToOne,
} from 'typeorm'
import { STATUS_TCC } from '../../domain/Tcc'
import { BancaModel } from './Banca.model'
import { UsuarioModel } from './Usuario.model'

@Entity({ name: 'tcc' })
export class TccModel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false, type: 'enum', enum: STATUS_TCC })
    status: STATUS_TCC

    @Column({ nullable: false, length: 256 })
    titulo: string

    @Column('text', { nullable: false, array: true })
    palavras_chave: string[]

    @Column({ nullable: false, length: 256 })
    introducao: string

    @Column({ nullable: false, length: 256 })
    objetivos: string

    @Column({ nullable: false, length: 256 })
    bibliografia: string

    @Column({ nullable: false, length: 256 })
    metodologia: string

    @Column({ nullable: false, length: 256 })
    resultados: string

    @Column({ nullable: true })
    nota_parcial: number

    @Column({ nullable: true })
    nota_final: number

    @Column({ nullable: true })
    path: string

    @OneToMany(() => BancaModel, (banca) => banca.tcc, {
        cascade: true,
        eager: true,
    })
    banca: BancaModel[]

    @Column({ nullable: false })
    alunoId: string

    @OneToOne(() => UsuarioModel)
    @JoinColumn({ name: 'alunoId' })
    aluno: UsuarioModel

    @Column({ nullable: false })
    orientadorId: string

    @ManyToOne(() => UsuarioModel)
    @JoinColumn({ name: 'orientadorId' })
    orientador: UsuarioModel
}

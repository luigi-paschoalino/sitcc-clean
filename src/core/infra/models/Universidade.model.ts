import { Entity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InstitutoModel } from "./Instituto.model";

@Entity({ name: 'universidade' })
export class UniversidadeModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, length: 256 })
    nome: string;

    @OneToMany(() => InstitutoModel, instituto => instituto.universidade, { cascade: true })
    institutos: InstitutoModel[]
}
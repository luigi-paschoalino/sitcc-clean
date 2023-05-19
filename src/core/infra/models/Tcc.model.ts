import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: 'tcc' })
export class TccModel {
    @PrimaryColumn({ name: 'id' })
    id: string;

    //TODO: continuar model de TCC
}
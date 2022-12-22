import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()

export class product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    catgeory: string;
}
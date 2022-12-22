import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./usersEntity";

@Entity("transactions")
export class Transaction {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 62})
    name: string

    @Column({type: "decimal", precision: 13, scale: 2})
    value: number

    @Column({length: 7})
    type: string

    @Column({type: "date"})
    transaction_date: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => User, (user) => user.transactions, {onDelete: "CASCADE"})
    user: User
}
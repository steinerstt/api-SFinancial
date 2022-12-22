import { getRounds, hashSync } from "bcrypt";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Transaction } from "./transactionsEntity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 62})
    name: string

    @Column({length: 120, unique: true})
    email: string

    @Column({length: 120})
    password: string

    @Column({default: true})
    is_active: boolean

    @Column({default: false})
    is_adm: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @BeforeUpdate()
    @BeforeInsert()
    hashPassword () {
        try {
            getRounds(this.password)
        } catch (error) {
            this.password = hashSync(this.password, 10)
        }
    }


    @OneToMany(() => Transaction, (transaction) => transaction.user, {eager: true})
    transactions: Transaction[]
}
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;
    @Exclude()
    @Column({ type: 'varchar', length: 255 })
    password: string;
    @Column({ type: 'varchar', length: 255 })
    role: string;
    @CreateDateColumn({ name: 'create_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;
    @UpdateDateColumn({ name: 'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;
    @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;
}
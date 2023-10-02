import {
    Entity,
    Column,
    Unique,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    ManyToMany,
    OneToMany,
    JoinTable,
} from "typeorm";
import { Task } from './Task'
@Entity('category')
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ length: 100, nullable: false })
    @Unique(['name'])

    name: string;

    @Column({ length: 255, nullable: false })
    @Unique(['description'])
    description: string;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

// @OneToMany(() => Task, (task) => task.classification)
// tasks: Category[]
  
}
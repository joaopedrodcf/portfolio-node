import { Field, ID, ObjectType } from 'type-graphql';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToMany,
    JoinTable
} from 'typeorm';
import { Skill } from './skill';

@ObjectType()
@Entity()
export class Experience extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    image: string;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    company: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    startDate: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    endDate: Date;

    @Field(() => [Skill], { nullable: true })
    @ManyToMany(() => Skill, skill => skill.experiences)
    @JoinTable()
    skills: Promise<Skill[]>;
}

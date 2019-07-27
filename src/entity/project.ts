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
export class Project extends BaseEntity {
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
    description: string;

    @Field(() => [Skill], { nullable: true })
    @ManyToMany(() => Skill, skill => skill.experiences)
    @JoinTable()
    skills: Promise<Skill[]>;
}

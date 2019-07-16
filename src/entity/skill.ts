import { Field, ID, ObjectType } from 'type-graphql';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToMany
} from 'typeorm';
import { Experience } from './experience';

@ObjectType()
@Entity()
export class Skill extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field(() => [Experience], { nullable: true })
    @ManyToMany(() => Experience, experience => experience.skills)
    experiences: Promise<Experience[]>;
}

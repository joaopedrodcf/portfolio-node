/* eslint-disable  @typescript-eslint/explicit-member-accessibility */
/* eslint-disable  @typescript-eslint/explicit-function-return-type  */
import { Field, ID, ObjectType } from 'type-graphql';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToMany
} from 'typeorm';
import { Experience } from './experience';
import { Project } from './project';

@ObjectType()
@Entity()
export class Skill extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ unique: true })
    name: string;

    @Field(() => [Experience], { nullable: true })
    @ManyToMany(() => Experience, experience => experience.skills)
    experiences: Promise<Experience[]>;

    @Field(() => [Project], { nullable: true })
    @ManyToMany(() => Project, project => project.skills)
    projects: Promise<Project[]>;
}

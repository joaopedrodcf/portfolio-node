import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@ObjectType({ description: 'Object representing project' })
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
}

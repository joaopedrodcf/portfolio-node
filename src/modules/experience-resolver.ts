import { Repository } from 'typeorm';
import { Arg, Mutation, Query, Resolver, Int } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Experience } from '../entity/experience';

@Resolver()
export class ExperienceResolver {
    constructor(
        @InjectRepository(Experience)
        private readonly experienceRepository: Repository<Experience>
    ) {}

    @Mutation(() => Experience)
    async createExperience(
        @Arg('image') image: string,
        @Arg('title') title: string,
        @Arg('company') company: string,
        @Arg('description') description: string,
        @Arg('startDate') startDate: Date,
        @Arg('endDate') endDate: Date
    ) {
        return this.experienceRepository
            .create({
                image,
                title,
                company,
                description,
                startDate,
                endDate
            })
            .save();
    }

    @Mutation(() => Boolean)
    async deleteExperience(
        @Arg('experienceId', () => Int) experienceId: number
    ) {
        await this.experienceRepository.delete({ id: experienceId });
        return true;
    }

    @Query(() => [Experience])
    async experiences() {
        return this.experienceRepository.find();
    }
}

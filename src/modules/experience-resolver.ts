import { Experience } from '../entity/experience';
import { Arg, Mutation, Query, Resolver, Int } from 'type-graphql';

@Resolver()
export class ExperienceResolver {
    @Mutation(() => Experience)
    async createExperience(
        @Arg('image') image: string,
        @Arg('title') title: string,
        @Arg('company') company: string,
        @Arg('description') description: string,
        @Arg('startDate') startDate: Date,
        @Arg('endDate') endDate: Date
    ) {
        if (endDate) {
            return Experience.create({
                image,
                title,
                company,
                description,
                startDate,
                endDate
            }).save();
        }

        return Experience.create({
            image,
            title,
            company,
            description,
            startDate,
            endDate
        }).save();
    }

    @Mutation(() => Boolean)
    async deleteExperience(
        @Arg('experienceId', () => Int) experienceId: number
    ) {
        await Experience.delete({ id: experienceId });
        return true;
    }

    @Query(() => [Experience])
    async experiences() {
        return Experience.find();
    }
}

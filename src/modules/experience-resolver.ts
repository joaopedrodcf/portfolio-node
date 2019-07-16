import { Repository } from 'typeorm';
import { Arg, Mutation, Query, Resolver, Int } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Experience } from '../entity/experience';
import { Skill } from '../entity/skill';

@Resolver()
export class ExperienceResolver {
    constructor(
        @InjectRepository(Experience)
        private readonly experienceRepository: Repository<Experience>,
        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>
    ) { }

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

    @Query(() => [Skill])
    async skills() {
        return this.experienceRepository.find();
    }

    @Mutation(() => Experience)
    async addSkill(
        @Arg('experienceId', () => Int) experienceId: number,
        @Arg('skillId', () => Int) skillId: number
    ) {
        const experience = await this.experienceRepository.findOne({
            id: experienceId
        });
        const skill = await this.skillRepository.findOne({ id: skillId });

        if (!experience) {
            throw new Error('Invalid experience ID');
        }

        if (!skill) {
            throw new Error('Invalid skill ID');
        }

        if ((await experience.skills).some(skills => skills.id === skillId)) {
            throw new Error('Skill Id already added');
        }

        // add the new recipe rate
        (await experience.skills).push(skill);

        // missing validation if already as the skill
        return await this.experienceRepository.save(experience);
    }
}

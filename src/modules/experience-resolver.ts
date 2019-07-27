import { Repository, getConnection } from 'typeorm';
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
    ) {}

    @Mutation(() => Experience)
    async createExperience(
        @Arg('image') image: string,
        @Arg('title') title: string,
        @Arg('company') company: string,
        @Arg('description') description: string,
        @Arg('startDate') startDate: Date,
        @Arg('endDate') endDate: Date
    ): Promise<Experience> {
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
    ): Promise<Boolean> {
        await this.experienceRepository.delete({ id: experienceId });
        return true;
    }

    @Query(() => [Experience])
    async experiences(): Promise<Experience[]> {
        return this.experienceRepository.find();
    }

    // Using RelationQueryBuilder
    // Faster than with the save
    // Problem "ER_DUP_ENTRY: Duplicate entry '1-1' for key 'PRIMARY'"
    // https://github.com/typeorm/typeorm/issues/3459
    @Mutation(() => Experience)
    async addSkillRelationQueryBuilder(
        @Arg('experienceId', () => Int) experienceId: number,
        @Arg('skillId', () => Int) skillId: number
    ): Promise<void> {
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

        await getConnection()
            .createQueryBuilder()
            .relation(Experience, 'skills')
            .of(experience)
            .add(skill);
    }

    // Alternative to RelationQueryBuilder with bulky save method call
    // Much worse perfomance
    @Mutation(() => Experience)
    async addSkill(
        @Arg('experienceId', () => Int) experienceId: number,
        @Arg('skillId', () => Int) skillId: number
    ): Promise<Experience> {
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

        (await experience.skills).push(skill);

        return await this.experienceRepository.save(experience);
    }

    @Query(() => [Skill])
    async getSkills(
        @Arg('experienceId', () => Int) experienceId: number
    ): Promise<Skill[]> {
        const experience = await this.experienceRepository.findOne({
            id: experienceId
        });

        if (!experience) {
            throw new Error('Invalid experience ID');
        }

        return await experience.skills;
    }
}

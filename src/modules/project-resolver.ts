import { Project } from '../entity/project';
import { Arg, Mutation, Query, Resolver, Int } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Skill } from '../entity/skill';

@Resolver()
export class ProjectResolver {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>
    ) {}

    @Mutation(() => Project)
    async createProject(
        @Arg('image') image: string,
        @Arg('title') title: string,
        @Arg('description') description: string
    ): Promise<Project> {
        return this.projectRepository
            .create({ image, title, description })
            .save();
    }

    @Mutation(() => Boolean)
    async deleteProject(
        @Arg('projectId', () => Int) projectId: number
    ): Promise<Boolean> {
        await this.projectRepository.delete({ id: projectId });
        return true;
    }

    @Query(() => [Project])
    async projects(): Promise<Project[]> {
        return this.projectRepository.find();
    }

    // Alternative to RelationQueryBuilder with bulky save method call
    // Much worse perfomance
    @Mutation(() => Project)
    async addSkill(
        @Arg('projectId', () => Int) projectId: number,
        @Arg('skillId', () => Int) skillId: number
    ): Promise<Project> {
        const project = await this.projectRepository.findOne({
            id: projectId
        });
        const skill = await this.skillRepository.findOne({ id: skillId });

        if (!project) {
            throw new Error('Invalid project ID');
        }

        if (!skill) {
            throw new Error('Invalid skill ID');
        }

        if ((await project.skills).some(skills => skills.id === skillId)) {
            throw new Error('Skill Id already added');
        }

        (await project.skills).push(skill);

        return await this.projectRepository.save(project);
    }

    @Query(() => [Skill])
    async getSkills(
        @Arg('projectId', () => Int) projectId: number
    ): Promise<Skill[]> {
        const project = await this.projectRepository.findOne({
            id: projectId
        });

        if (!project) {
            throw new Error('Invalid project ID');
        }

        return await project.skills;
    }
}

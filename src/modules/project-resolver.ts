import { Project } from '../entity/project';
import { Arg, Mutation, Query, Resolver, Int } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';

@Resolver()
export class ProjectResolver {
    constructor(
        @InjectRepository(Project)
        private readonly pprojectRepository: Repository<Project>
    ) {}

    @Mutation(() => Project)
    async createProject(
        @Arg('image') image: string,
        @Arg('title') title: string,
        @Arg('description') description: string
    ) {
        return this.pprojectRepository
            .create({ image, title, description })
            .save();
    }

    @Mutation(() => Boolean)
    async deleteProject(@Arg('projectId', () => Int) projectId: number) {
        await this.pprojectRepository.delete({ id: projectId });
        return true;
    }

    @Query(() => [Project])
    async projects() {
        return this.pprojectRepository.find();
    }
}

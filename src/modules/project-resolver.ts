import { Project } from '../entity/project';
import { Arg, Mutation, Query, Resolver, Int } from 'type-graphql';

@Resolver()
export class ProjectResolver {
    @Mutation(() => Project)
    async createProject(
        @Arg('image') image: string,
        @Arg('title') title: string,
        @Arg('description') description: string
    ) {
        return Project.create({ image, title, description }).save();
    }

    @Mutation(() => Boolean)
    async deleteProject(@Arg('projectId', () => Int) projectId: number) {
        await Project.delete({ id: projectId });
        return true;
    }

    @Query(() => [Project])
    async projects() {
        return Project.find();
    }
}

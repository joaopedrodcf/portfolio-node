import { Project } from '../entity/project';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';

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

    @Query(() => [Project])
    async projects() {
        return Project.find();
    }
}

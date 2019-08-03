import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import {
    ContactResolver,
    ExperienceResolver,
    ProjectResolver,
    SkillResolver
} from '../modules';

export const createSchema = (): Promise<GraphQLSchema> =>
    buildSchema({
        resolvers: [
            ContactResolver,
            ExperienceResolver,
            ProjectResolver,
            SkillResolver
        ],
        container: Container
    });

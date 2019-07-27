import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { HelloResolver } from '../modules/hello-resolver';
import { ContactResolver } from '../modules/contact-resolver';
import { ProjectResolver } from '../modules/project-resolver';
import { ExperienceResolver } from '../modules/experience-resolver';
import { SkillResolver } from '../modules/skill-resolver';

export const createSchema = (): Promise<GraphQLSchema> =>
    buildSchema({
        resolvers: [
            HelloResolver,
            ContactResolver,
            ProjectResolver,
            ExperienceResolver,
            SkillResolver
        ],
        container: Container
    });

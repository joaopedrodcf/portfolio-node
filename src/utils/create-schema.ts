import { buildSchema } from 'type-graphql';
import { HelloResolver } from '../modules/hello-resolver';
import { ContactResolver } from '../modules/contact-resolver';
import { ProjectResolver } from '../modules/project-resolver';

export const createSchema = () =>
    buildSchema({
        resolvers: [HelloResolver, ContactResolver, ProjectResolver]
    });

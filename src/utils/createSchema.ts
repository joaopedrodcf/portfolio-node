import { buildSchema } from "type-graphql";
import { HelloResolver } from "../modules/HelloResolver";
import { ContactResolver } from "../modules/ContactResolver";

export const createSchema = () =>
    buildSchema({
        resolvers: [
            HelloResolver,
            ContactResolver
        ]
    });
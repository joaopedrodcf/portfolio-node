import { Resolver, Arg, Query } from "type-graphql";
import { sendEmail } from '../utils/sendEmail';

@Resolver()
export class ContactResolver {
    @Query(() => Boolean)
    async contact(@Arg("name") name: string, @Arg("email") email: string, @Arg("message") message: string): Promise<boolean> {

        await sendEmail(
            name,
            email,
            message
        );

        return true;
    }
}
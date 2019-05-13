import 'reflect-metadata';
import { ApolloServer } from "apollo-server-express";
import Express from 'express';
import cors from "cors";
import { createSchema } from "./utils/createSchema";
import dotenv from 'dotenv';

const main = async () => {

    dotenv.config();

    const schema = await createSchema();

    const apolloServer = new ApolloServer({ schema });

    const app = Express();

    app.use(
        cors({
            credentials: true,
            origin: "http://localhost:3000"
        })
    );

    const corsOptions = {
        origin: process.env.ENDPOINT,
        optionsSuccessStatus: 200
    };

    app.use(cors(corsOptions));

    apolloServer.applyMiddleware({ app, cors: false });


    app.listen(4000, () => {
        console.log("server started in http://localhost:4000/graphql");
    });
}

main();
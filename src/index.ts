import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import cors from 'cors';
import { createSchema } from './utils/create-schema';
import dotenv from 'dotenv';
import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';

dotenv.config();

const main = async () => {
    useContainer(Container);

    await createConnection();

    const apolloServer = new ApolloServer({ schema: await createSchema() });

    const app = Express();

    app.use(
        cors({
            origin: process.env.ENDPOINT,
            optionsSuccessStatus: 200
        })
    );

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(4000, () => {
        console.log('server started in http://localhost:4000/graphql');
    });
};

main();

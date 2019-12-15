import express, { Application } from "express";
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

import { typeDefs, resolvers } from './schema/index';

const server = new ApolloServer({ typeDefs, resolvers })

const app: Application = express();

server.applyMiddleware({ app });

// app.use(cors());
app.listen(4000, () => {
  console.log("Now listening for requestion on port 4000");
});

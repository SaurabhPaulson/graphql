import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

const app = express() as Application;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

(async () => {
  await server.start();
  server.applyMiddleware({ app });
})();

export default app;

import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    users: [User]
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): String
    login(email: String!, password: String!): String
  }
`;

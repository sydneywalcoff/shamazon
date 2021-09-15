const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
    }

    type Auth {
        user: User
        token: ID
    }

    type Query {
        user: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
    }

`;

module.exports = typeDefs;
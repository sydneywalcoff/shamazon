const { gql } = require('apollo-server');

const typeDefs = gql`
    type Category {
        _id: ID
        name: String
    }

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
        categories: [Category]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
    }

`;

module.exports = typeDefs;
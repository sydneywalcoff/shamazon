const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
    }

    type Query {
        user: User
    }

    type Mutation {
        addUser(username: String, email: String, password: String): User
        login(username: String, password: String): User
    }

`;

module.exports = typeDefs;
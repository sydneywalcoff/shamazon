const { gql } = require('apollo-server-express');

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
        
    }

`;

module.exports = typeDefs;
const { gql } = require('apollo-server');

const typeDefs = gql`
    type Category {
        _id: ID
        name: String
    }

    type Product {
        _id: ID
        name: String
        description: String
        image: String
        category: Category
        price: Float
        quantity: Int
    }

    type Order {
        _id: ID
        purchaseDate: String
        products: [Product]!
    }

    type User {
        _id: ID
        username: String
        email: String
        orders: [Order]
    }

    type Auth {
        user: User
        token: ID
    }

    type Query {
        me: User
        categories: [Category]
        products(category: ID, name: String): [Product]
        product(_id: ID!): Product
        order(_id: ID!): Order
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        addOrder(products: [ID]!): Order
    }

`;

module.exports = typeDefs;
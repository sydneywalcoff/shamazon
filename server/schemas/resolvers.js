const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

const resolvers = {
    // Query: {

    // },
    Mutation: {
        addUser: async (_, args) => {
            const user = await User.create(args);

            return user;
        }
    }
};

module.exports = resolvers;
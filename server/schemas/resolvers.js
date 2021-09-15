const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

const resolvers = {
    // Query: {

    // },
    Mutation: {
        addUser: async (_, args) => {
            const user = await User.create(args);

            return user;
        },
        login: async (_, { username, password }) => {
            const user =  await User.findOne({ username });
            if(!user) {
                return new AuthenticationError('Wrong credentials!');
            }

            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError('Wrong credentials!');
            }
            return user;
        }
    }
};

module.exports = resolvers;
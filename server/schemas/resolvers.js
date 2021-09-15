const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    // Query: {

    // },
    Mutation: {
        addUser: async (_, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { user, token };
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
            const token = signToken(user);
            return { user, token };
        }
    }
};

module.exports = resolvers;
const { AuthenticationError } = require('apollo-server-express');
const { User, Category, Product } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        categories: async() => {
            return await Category.find();
        },
        products: async(_, { category, name }) => {
            const params = {};
            if(category) {
                params.category = category;
            }
            if(name) {
                params.name = {
                    $regex: name
                }
            }
            return await Product.find(params).populate('category');
        },
        product: async(_, { _id }) => {
            return await Product.findById(_id).populate('category');
        }
    },
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
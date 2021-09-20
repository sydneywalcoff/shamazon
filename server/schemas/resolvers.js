const { AuthenticationError } = require('apollo-server-express');
const { User, Category, Product, Order } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async(_, args, context) => {
            if(context.user) {
                const me = await User.findById(context.user._id);
                
                me.orders.sort((a,b) => b.purchaseDate - a.purchaseDate);
                return me;
            }
        },
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
        },
        order: async(_, { _id }, context) => {
            if(context.user){
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'name'
                });
                return user.orders;
            }
            return new AuthenticationError('Not logged in :(');
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
        },
        addOrder: async (_, { products }, context) => {
            if(context.user) {
                const order = new Order({ products });
                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
                return order;
            }
            return new AuthenticationError('Not logged in, my dude');
        }
    }
};

module.exports = resolvers;
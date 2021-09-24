const { AuthenticationError } = require('apollo-server-express');
const { User, Category, Product, Order } = require('../models');
const { signToken } = require('../utils/auth');
const resolvers = {
    Query: {
        me: async(_, args, context) => {
            if(context.user) {
                const me = await User.findById(context.user._id)
                    .select('-__v -password');
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
            return await Product.find(params).select('-__v').populate('category');
        },
        product: async(_, { _id }) => {
            return await Product.findById(_id).select('-__v').populate('category');
        },
        order: async(_, { _id }, context) => {
            if(context.user){
                const order = await Order.findById({ _id }).select('-__v').populate('products');
                return order;
            }
            return new AuthenticationError('Not logged in :(');
        },
        orders: async(_, args) => {
            const orders = await Order.find().select('-__v').populate('products');
            return orders;
        }
    },
    Mutation: {
        addUser: async (_, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { user, token };
        },
        login: async (_, { username, password }) => {
            const user =  await User.findOne({ username }).select('-__v -password');
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
                const order = await Order.create({ products });
                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
                return order.populate('products');
            }
            return new AuthenticationError('Not logged in, my dude');
        }
    }
};

module.exports = resolvers;
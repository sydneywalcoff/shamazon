const { ApolloServer} = require('apollo-server');

const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// server.applyMiddleware({ app });

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


db.once('open', () => {
    server.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
    })
})
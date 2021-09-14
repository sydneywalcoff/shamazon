const { ApolloServer} = require('apollo-server');

const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers
});

db.once('open', () => {
    server.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
    })
})
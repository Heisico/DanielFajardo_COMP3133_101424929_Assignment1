const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./schema/typeDefs');
const userResolvers = require('./resolvers/userResolvers');
const employeeResolvers = require('./resolvers/employeeResolvers');

const app = express();
connectDB();

const server = new ApolloServer({ typeDefs, resolvers: [userResolvers, employeeResolvers] });
server.start().then(() => {
    server.applyMiddleware({ app });
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});

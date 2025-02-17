const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const app = express();
connectDB();

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start(); // Ensure the server starts before middleware

    app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));

    app.listen(4000, () => {
        console.log('✅ Server running on http://localhost:4000/graphql');
    });
}

startServer();

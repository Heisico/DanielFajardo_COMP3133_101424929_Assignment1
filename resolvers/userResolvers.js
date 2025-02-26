const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userResolvers = {
    Mutation: {
        signup: async (_, { username, email, password }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, email, password: hashedPassword });
            await user.save();
            return "User registered successfully";
        },
    },
    Query: {
        login: async (_, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user) throw new Error('User not found');
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) throw new Error('Invalid credentials');
            return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        },
    }
};

module.exports = userResolvers;

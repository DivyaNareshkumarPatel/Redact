const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log('MongoDB connection error:', err));
};

module.exports = connectDB;

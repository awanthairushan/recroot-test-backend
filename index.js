const dotenv = require("dotenv")
const express = require("express");
const cors = require('cors');
const connectDB = require("./config/dbConnection");

dotenv.config();
connectDB();

const index = express();

const corsOption = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

const port = process.env.PORT || 5000

index.use(express.json());
index.use(cors(corsOption));

index.use(express.urlencoded());

index.use('/api/post', require('./routes/postRoutes'));
index.use('/api/user', require('./routes/userRoutes'));

index.listen(port)
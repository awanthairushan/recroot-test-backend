const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database Connected: " + connect.connection.host + " - " + connect.connection.name);
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1); // Exit the process with a non-zero code to indicate failure
    }
};

module.exports = connectDB;

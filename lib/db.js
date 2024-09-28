const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

dbConnect();

module.exports = dbConnect;

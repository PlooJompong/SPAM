const mongoose = require('mongoose')

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT_URI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("connect failed" + error.message)
    }
    }

module.exports = connectMongo
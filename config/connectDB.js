const mongoose = require('mongoose');

const connectDB = async (req, res) => {
    const mongo_uri = process.env.MONGO_URI;
    try {
        await mongoose.connect(mongo_uri);
        console.log('database connected')
    } catch (error) {
        console.log(error)
    }

}


module.exports = connectDB;
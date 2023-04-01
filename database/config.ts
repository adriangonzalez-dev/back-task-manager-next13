//connect mongoose with mongodb

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(String(process.env.MONGO_URI))
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}

export default connectDB;
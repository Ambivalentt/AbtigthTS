import mongoose from 'mongoose';
import 'dotenv/config';

const connnectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

export default connnectMongoDB;
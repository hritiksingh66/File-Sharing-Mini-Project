import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const DBConnection = async () => {
    let MONGODB_URI = process.env.MONGO_URI;

    if (!MONGODB_URI && USERNAME && PASSWORD) {
        MONGODB_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@file-sharing-app.6u0zoky.mongodb.net/?retryWrites=true&w=majority`;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        });
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Error while connecting with database:', error.message);
    }
};

export default DBConnection;

import mongoose from 'mongoose';

const conectarDB = async() =>{
    try {
        const db = await mongoose.connect(process.env.MONGO_uri);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    };
};

export default conectarDB;
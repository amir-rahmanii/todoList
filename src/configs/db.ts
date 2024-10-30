import mongoose from "mongoose";

const dbConnected = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            return false
        }

        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) throw new Error("Missing MONGODB_URI environment variable");

        await mongoose.connect(mongoURI)
            .then(() => console.log('Connected!'))

    } catch (err) {
        console.log("fail to connected", err)
    }
}



export default dbConnected
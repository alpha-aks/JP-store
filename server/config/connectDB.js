import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
    throw new Error("Please provide MONGODB_URI");
}

// Increase bufferTimeoutMS to prevent premature 10000ms timeouts during Atlas handshakes
mongoose.set("bufferTimeoutMS", 30000);

let cachedConnectionPromise = null;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!cachedConnectionPromise) {
        cachedConnectionPromise = mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 20000,
            connectTimeoutMS: 20000,
            socketTimeoutMS: 45000,
            maxPoolSize: 25,
        }).then((conn) => {
            console.log("MongoDB connected successfully :)");
            return conn;
        }).catch((err) => {
            console.error("MongoDB connection Failed!!!", err);
            cachedConnectionPromise = null;
            throw err;
        });
    }

    try {
        await cachedConnectionPromise;
        return mongoose.connection;
    } catch (err) {
        cachedConnectionPromise = null;
        throw err;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected, resetting cached connection promise...");
    cachedConnectionPromise = null;
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err.message);
    cachedConnectionPromise = null;
});

export default connectDB;
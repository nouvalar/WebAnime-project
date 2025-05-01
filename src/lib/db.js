import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI harus diisi di file .env')
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export const connect = async () => {
    try {
        if (cached.conn) {
            return cached.conn
        }

        if (!cached.promise) {
            const opts = {
                bufferCommands: true,
                serverSelectionTimeoutMS: 30000, // Increased timeout
                socketTimeoutMS: 30000,
                connectTimeoutMS: 30000,
                maxPoolSize: 10,
                family: 4 // Gunakan IPv4
            }

            mongoose.set('strictQuery', true)

            cached.promise = mongoose.connect(MONGODB_URI, opts)
                .then((mongoose) => {
                    console.log('MongoDB Connected Successfully!')
                    return mongoose
                })
                .catch((error) => {
                    console.error('Error connecting to MongoDB:', error.message)
                    cached.promise = null // Reset promise on error
                    throw error
                })
        }
        cached.conn = await cached.promise
        return cached.conn
    } catch (error) {
        console.error('MongoDB connection error:', error)
        cached.promise = null // Reset promise on error
        throw error
    }
} 
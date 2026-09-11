import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/farmconnect";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose | null> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 3000, // Quick fail if local MongoDB isn't running
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      return m;
    }).catch((err) => {
      console.warn("MongoDB connection could not be established:", err.message);
      cached.promise = null;
      return null as unknown as typeof mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch {
    cached.promise = null;
    return null;
  }

  return cached.conn;
}

export default connectDB;

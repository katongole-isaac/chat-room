import mongoose from "mongoose";

const URI = process.env.MONGODB_URI

if(!URI) throw new Error("You need to set MONGODB_URI in .env.local file");

let cached = global.mongoose ;

if(!cached) cached = global.mongoose = {conn: null, promise: null}

const dbConnect = async () => {

    if(cached.conn) return cached.conn;

    if(!cached.promise) {
        
      cached.promise =  mongoose.connect(URI)
        .then( m => m)
        
    }

    cached.conn = await cached.promise;
    return cached;

}

export default dbConnect;
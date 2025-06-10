import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const connectioninstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
         console.log("MongoDB Connected: DB HOST:" + connectioninstance.connection.host);
        // console.log("hello")
    } catch (error) {
        console.log("MONGO DB CONNECTION ERROR:",error);
        process.exit(1);
    }
}
export default connectDB;
import mongoose from 'mongoose';

export default async function connectDb() {
    try {

        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_KEY!);

        console.log("Db connected");
    } catch (error) {
        console.log("Error connecting db: ", error);
    }
}
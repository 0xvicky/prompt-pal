import mongoose from "mongoose";

let isConnected = false; //track the connnection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected !!☑️☑️");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Promptioner"
    });
    console.log("Connected✅");
    isConnected = true;
  } catch (error) {
    console.log(`Error occured:${error}`);
  }
};

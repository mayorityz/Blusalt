import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.Promise = global.Promise;

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017'
const initDb = async (): Promise<void> => {
  if (!DB_URL) {
    throw new Error(
      "Define the DB_URL environment variable inside .env to continue!"
    );
  }
  const dbURI = DB_URL+"/exam";
  console.log(dbURI)
  await mongoose.connect(
    dbURI,
    {
      autoCreate: true,
      autoIndex: true,
    },
    async () => {
      console.log("mongdb is connected");
        //   let's create a new user on init.
    }
  );
};

export default initDb;

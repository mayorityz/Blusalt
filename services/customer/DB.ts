import mongoose from "mongoose";
import {DB_URL} from "./utils/env"
mongoose.Promise = global.Promise;

const DB = DB_URL || 'mongodb://localhost:27017'
const initDb = async (): Promise<void> => {
  if (!DB) {
    throw new Error(
      "Define the DB_URL environment variable inside .env to continue!"
    );
  }
  const dbURI = DB+"/exam";
  console.log(dbURI)
  await mongoose.connect(
    dbURI,
    {
      autoCreate: true,
      autoIndex: true,
    },
    async () => {
      console.log("mongdb is connected");
    }
  );
};

export default initDb;

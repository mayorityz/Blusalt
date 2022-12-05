import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const DB_URL = `${process.env.DB_URL}/exam` || 'mongodb://localhost:27017/exam'
const initDb = async (): Promise<void> => {
  if (!DB_URL) {
    throw new Error(
      "Define the DB_URL environment variable inside .env to continue!"
    );
  }
  const dbURI = DB_URL;
  mongoose.connect(
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

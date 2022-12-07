import dotenv from "dotenv";
dotenv.config();

export const {RABBITMQURL, BILLING_PORT, DB_URL, PORT } = process.env;
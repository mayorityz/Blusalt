import dotenv from "dotenv";
dotenv.config();

export const {RABBITMQURL, BILLING_PORT, } = process.env;
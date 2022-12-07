import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import initDb from "../DB";
import BillingRoutes from "./billing.route"
import {connect} from "amqplib"
import {billingModel} from "./billing.model"
import {RABBITMQURL} from "../utils/env"

dotenv.config();
initDb();

const app: Express = express();
const port = process.env.PORT || 4444;
const amqpServer = RABBITMQURL || "amqp://localhost:5672"
var channel, connection;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

connectQueue() // call connectQueue function
async function connectQueue() {
    try {
        connection = await connect(amqpServer);
        channel = await connection.createChannel()
        
        await channel.assertQueue("updateRecord")
        channel.consume("updateRecord", async(data) => {
            let _data = JSON.parse(Buffer.from(data.content))
            // update the db : status:successful
            await billingModel.updateOne({_id : _data.id}, {status:"success"})
            channel.ack(data)            
        })

    } catch (error) {
        console.log(error)
    }
}

app.get("/", (req: Request, res: Response) => {
  res.send("Billing Server is up!");
});

app.use("/api/v1", BillingRoutes());

app.listen(port, () => {
  console.log(
    `⚡️⚡️⚡️⚡️[server]: Billing Service Server is running on port ${port}`
  );
});

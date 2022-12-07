import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import initDb from "../DB";
import BillingRoutes from "./billing.route"
import {connect} from "amqplib"

dotenv.config();
initDb();

const app: Express = express();
const port = process.env.PORT || 4444;
const amqpServer = process.env.RabbitMqUrl || "amqp://localhost:5672"
var channel, connection;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

connectQueue() // call connectQueue function
async function connectQueue() {
    try {
        connection = await connect(amqpServer);
        channel = await connection.createChannel()
        
        await channel.assertQueue("updateRecord")
        channel.consume("updateRecord", data => {
            console.log("Data received : ", `${Buffer.from(data.content)}` );
            let _data = JSON.parse(data.content)
            channel.ack(data)
            // update the db
            // customerModel.updateOne({_id : _data._id}, {})
            console.log("logged : ")
            console.log(data.content)
        })

    } catch (error) {
        console.log(error)
    }
}

app.get("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.send(req.body);
});

app.use("/api/v1", BillingRoutes());

app.listen(port, () => {
  console.log(
    `⚡️⚡️⚡️⚡️[server]: Billing Service Server is running on port ${port}`
  );
});

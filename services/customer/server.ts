import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import initDb from "./DB";
import CustomerRoutes from "./customer.route"
import {connect} from "amqplib"
import {customerModel} from "./customer.model"

dotenv.config();
initDb();

var channel, connection;

const app: Express = express();
const port = process.env.PORT || 4564;
const amqpServer = process.env.RabbitMqUrl || "amqp://localhost:5672"

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


// connectQueue() // call connectQueue function
// async function connectQueue() {
//     try {
//         connection = await connect(amqpServer);
//         channel = await connection.createChannel()
        
//         await channel.assertQueue("updateRecord")
//         channel.consume("updateRecord", data => {
//             console.log("Data received : ", `${Buffer.from(data.content)}` );
//             let _data = JSON.parse(data.content)
//             channel.ack(data)
//             // update the db
//             // customerModel.updateOne({_id : _data._id}, {})
//             console.log("logged : ")
//             console.log(data.content)
//         })

//     } catch (error) {
//         console.log(error)
//     }
// }

app.get("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.send('Server Connected!');
});

app.use("/api/v1", CustomerRoutes());

app.listen(port, () => {
  console.log(
    `⚡️⚡️⚡️⚡️[server]: Customer Service Server is running on port ${port}`
  );
});

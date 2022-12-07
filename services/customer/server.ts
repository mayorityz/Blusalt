import express, { Express, Request, Response } from "express";
import initDb from "./DB";
import CustomerRoutes from "./customer.route"
import {PORT} from "./utils/env"
initDb();

const app: Express = express();
const port = PORT || 4564;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get("/", (req: Request, res: Response) => {
  res.send('Server Connected!');
});

app.use("/api/v1", CustomerRoutes());

app.listen(port, () => {
  console.log(
    `⚡️⚡️⚡️⚡️[server]: Customer Service Server is running on port ${port}`
  );
});

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import initDb from "./DB";
import CustomerRoutes from "./customer.route"


dotenv.config();
initDb();

const app: Express = express();
const port = process.env.PORT || 4564;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

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

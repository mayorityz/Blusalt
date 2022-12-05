import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import initDb from "../DB";
import BillingRoutes from "./billing.route"


dotenv.config();
initDb();

const app: Express = express();
const port = process.env.PORT || 4444;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

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

import { Router } from "express";
import { NewUser, FundWallet } from "./customer.controller";

const router = Router()

const CustomerRoutes = () =>{
   router.post("/customer/new-customer", NewUser)
   router.post("/customer/new-transaction", FundWallet)
   return router
}

export default CustomerRoutes
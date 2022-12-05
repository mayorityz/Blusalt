import { Router } from "express";
import { NewTransaction } from "./billing.controller";

const router = Router()

const BillingRoutes = () =>{
   router.post("/billing/create-new-billing", NewTransaction)
   return router
}

export default BillingRoutes
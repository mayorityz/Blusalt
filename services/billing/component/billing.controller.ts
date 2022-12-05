import { Request, Response } from "express";
import { billingModel } from "./billing.model";

// serves as a web hook.
export const NewTransaction = async(req:Request, res:Response)=>{
    try {
        const {amount, customerId} = req.body;
        const save = await billingModel.create({amount, customerId});
        if(save) res.status(200).json({message:"New Billing Transaction Success!"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
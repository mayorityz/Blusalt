import { Request, Response } from "express"
import {customerModel, customerDocumentT} from "./customer.model"
import axios from "axios"
import { BILLING_PORT } from "./utils/env"
import { Rabbit } from "./utils/rabbit"

const billingPort = BILLING_PORT  || 4444

export const NewUser = async(request:Request, response:Response)=>{
    try {
        let {firstName, lastName, email, password}:customerDocumentT = request.body;
        let newUser = await customerModel.create({firstName, lastName, email, password})
        if(newUser) response.status(201).json({message:"User Created Successfully"})
    } catch (error) {
        console.log(error)
        response.status(404).json({message:"Error Occured While Saving"})
    }   
}

export const FundWallet = async(req:Request, res:Response)=>{
    // ! check that the id/email exists -> i am using email for ease here.
        // ! make post request via web hook to the Billing Service.
        // ! collect previous balance
        // ! use producer
    try {
        const {amount, email} = req.body;
        const verifyEmail = await customerModel.findOne({email});
        if(verifyEmail){
            //! 2. send http data to billing service webhook
            let saving = await axios.post(`http://localhost:${billingPort}/api/v1/billing/create-new-billing`, {
                amount,
                customerId : verifyEmail._id,
                lastBalance : verifyEmail.wallet
            })
            
            await Rabbit(saving.data.data);
            res.status(201).json({message:"Account Funded Successfully!"})
        }
        else{
            res.status(400).json({message:"user doesn't exist!"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message :error.message})
    }
}
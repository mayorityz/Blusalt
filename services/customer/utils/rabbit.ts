import {connect} from "amqplib"
import { Constants } from "./enums"
import { RABBITMQURL } from "./env"

interface dataI{
    _id:string
}

export const Rabbit =async(data:dataI)=>{
    console.log("di",data)
    const amqpServer = RABBITMQURL || "amqp://localhost:5672"
    const amqpConnection = await connect(amqpServer)
    const createChannel = await amqpConnection.createChannel();

    await createChannel.assertQueue(Constants.UPDATE_RECORD, {durable:true})
    createChannel.sendToQueue(Constants.UPDATE_RECORD, Buffer.from(JSON.stringify({id: data._id})));

}
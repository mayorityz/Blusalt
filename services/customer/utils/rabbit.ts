import {connect} from "amqplib"
import { Constants } from "./enums"
import { RABBITMQURL } from "./env"

export const Rabbit =async()=>{
    const amqpServer = RABBITMQURL || "amqp://localhost:5672"
    const amqpConnection = await connect(amqpServer)
    const createChannel = await amqpConnection.createChannel();

    await createChannel.assertQueue(Constants.UPDATE_RECORD, {durable:false})
    // createChannel.sendToQueue(Constants.UPDATE_RECORD, Buffer.from(JSON.stringify({id: saving.data._id})));

}
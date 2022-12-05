import mongoose, { Document, Model, Schema } from "mongoose";
import { Status } from "./constants";

interface billingDocumentT extends Document {
  amount:number,
  customerId : string,
  status : Status
}

const billingSchema: Schema = new Schema(
  {
    amount: {
      type: Schema.Types.Number,
      required: true,
    },
    customerId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    status:{
        type: Schema.Types.String,
        required:true,
        default:Status.PENDING
    }
  },
  {
    collection: "billings",
    timestamps: true,
  }
);


const billingModel: Model<billingDocumentT> = mongoose.model<billingDocumentT>(
  "billing",
  billingSchema
);

export { billingModel, billingDocumentT };

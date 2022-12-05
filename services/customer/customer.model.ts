import mongoose, { Document, Model, Schema } from "mongoose";
import { hash } from "bcrypt";

interface customerDocumentT extends Document {
  amount:number,
  customerId : string,
  status : string
}

const customerSchema: Schema = new Schema(
  {
    firstName: {
      type: Schema.Types.String,
      required: true,

    },
    lastName: {
        type: Schema.Types.String,
        required: true,
      },
      email: {
        type: Schema.Types.String,
        required: true,
      },
      password: {
        type: Schema.Types.String,
        required: true,
      },
      wallet:{
        type:Schema.Types.Number,
        default:"pending"
      }
  },
  {
    collection: "customers",
    timestamps: true,
  }
);




const customerModel: Model<customerDocumentT> = mongoose.model<customerDocumentT>(
  "customer",
  customerSchema
);


customerSchema.pre("save", async function (next) {
    try {
      if (!this.isModified("password")) {
        return next();
      }
      const saltRounds = 14;
      const hashed = await hash(this["password"], saltRounds);
      this["password"] = hashed;
      return next();
    } catch (err) {
      return next(err);
    }
  });

export { customerModel, customerDocumentT };

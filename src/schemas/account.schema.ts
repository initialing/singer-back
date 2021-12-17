import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Account extends Document {
    @Prop()
    account: string;

    @Prop()
    password: string;
}

export type AccountDoc = Account & Document;

export const AccountShema = SchemaFactory.createForClass(Account);

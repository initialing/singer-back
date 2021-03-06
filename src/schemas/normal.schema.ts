import { Prop, Schema } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

@Schema()
export class Normal extends mongoose.Document {
    @Prop()
    createUser: string;

    @Prop({ type: mongoose.Schema.Types.Date })
    createTime: Date;

    @Prop()
    updateUser: string;

    @Prop({ type: mongoose.Schema.Types.Date })
    updateTime: Date;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;
}

export type NormalDocument = Normal & mongoose.Document;

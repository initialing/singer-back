import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { NormalDocument, Normal } from "../normal.schema";

@Schema()
export class Country extends Normal {
    @Prop()
    name: string;
}

export type CountryDoc = Country & NormalDocument;

export const CountrySchema = SchemaFactory.createForClass(Country);

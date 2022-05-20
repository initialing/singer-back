import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Normal, NormalDocument } from "../normal.schema";

@Schema()
export class Artist extends Normal {
    @Prop()
    name: string;

    @Prop()
    countryId: string;

    @Prop()
    sex: 1 | 2 | 3;

    @Prop()
    birthday?: Date;

    @Prop()
    deadTime?: Date;

    @Prop()
    type: 1 | 2;

    @Prop()
    activeTime?: Date[][];

    @Prop()
    member?: string[];
}

export type ArtistDoc = Artist & NormalDocument;

export const ArtistSchema = SchemaFactory.createForClass(Artist);

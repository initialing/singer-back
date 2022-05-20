import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { NormalModel } from "../normal.model";
import { PaginationModel } from "../page.model";
import { CountryModel } from "./country.model";

@ObjectType("Artist", { description: "Artist" })
export class ArtistModel extends NormalModel {
    @Field((type) => String)
    _id: string;

    @Field({ nullable: false })
    name: string;

    @Field({ nullable: false })
    countryId: string;

    @Field((type) => CountryModel, { nullable: true })
    country?: CountryModel;

    @Field({ nullable: true })
    sex: 1 | 2 | 3;

    @Field({ nullable: true })
    birthday?: Date;

    @Field({ nullable: true })
    deadTime?: Date;

    @Field({ nullable: false })
    type: 1 | 2;

    @Field((type) => [[Date]], { nullable: true })
    activeTime?: Date[][];

    @Field((type) => [String], { nullable: true })
    member?: string[];

    @Field((type) => [ArtistModel], { nullable: true })
    memberDetail?: ArtistModel[];
}

@ObjectType()
export class PageArtist extends PaginationModel(ArtistModel) {}

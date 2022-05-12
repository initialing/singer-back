import { Field, ObjectType } from "@nestjs/graphql";
import { NormalModel } from "../normal.model";
import { PaginationModel } from "../page.model";

@ObjectType({ description: "country" })
export class CountryModel extends NormalModel {
    @Field((type) => String)
    _id: string;

    @Field({ nullable: false })
    name: string;
}

@ObjectType()
export class PageCountry extends PaginationModel(CountryModel) {}

import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "country" })
export class CountryModel {
    @Field((type) => String)
    _id: string;

    @Field({ nullable: false })
    name: string;
}

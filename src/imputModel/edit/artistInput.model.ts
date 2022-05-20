import { InputType, Field, ObjectType, Int } from "@nestjs/graphql";
import { NoramlInputModel } from "../normalInput.model";

@ObjectType("ArtistInput", { description: "ArtistInput" })
@InputType("ArtistInputModel", { description: "ArtistInputModel" })
export class ArtistInputModel extends NoramlInputModel {
    @Field({ nullable: false })
    name: string;

    @Field({ nullable: false })
    countryId: string;

    @Field((type) => Int, { nullable: true })
    sex: 1 | 2 | 3;

    @Field({ nullable: true })
    birthday?: Date;

    @Field({ nullable: true })
    deadTime?: Date;

    @Field({ nullable: false })
    type: 1 | 2;

    @Field((type) => [[Date]], { nullable: "itemsAndList" })
    activeTime?: Date[][];

    @Field((type) => [String], { nullable: true })
    member?: string[];
}

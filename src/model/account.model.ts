import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "account" })
export class AccountModel {
    @Field((type) => String)
    _id: string;

    @Field({ nullable: false })
    account: string;

    @Field({ nullable: false })
    password: string;
}

import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "normal" })
export class NormalModel {
    @Field((type) => String)
    createUser: string;

    @Field({ nullable: false })
    createTime: Date;

    @Field({ nullable: true })
    updateUser: string;

    @Field({ nullable: true })
    updateTime: Date;

    @Field({ nullable: false })
    isDeleted: boolean;
}

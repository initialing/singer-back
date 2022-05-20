import { InputType, Field } from "@nestjs/graphql";

@InputType({ description: "NormalInout" })
export class NoramlInputModel {
    @Field((type) => String, { nullable: true })
    createUser?: string;

    @Field({ nullable: true })
    createTime?: Date;

    @Field({ nullable: true })
    updateUser?: string;

    @Field({ nullable: true })
    updateTime?: Date;

    @Field({ nullable: true })
    isDeleted?: boolean;
}

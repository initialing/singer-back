import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "CommonRes" })
export class CommonRes {
    constructor(code: number, describe: string) {
        this.code = code;
        this.describe = describe;
    }
    @Field()
    code: number = null;

    @Field()
    describe: string = null;
}

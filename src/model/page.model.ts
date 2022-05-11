import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Type } from "@nestjs/common";

export function PaginationModel<T>(classRef: Type<T>): any {
    @ObjectType({ isAbstract: true })
    abstract class Pagination {
        @Field((type) => [classRef])
        data: T[];

        @Field((type) => Int)
        totalCount: number;
    }

    return Pagination;
}

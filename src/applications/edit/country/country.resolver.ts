import { UseGuards } from "@nestjs/common";
import {
    Args,
    ID,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from "@nestjs/graphql";
import { CurrentUser } from "src/decorators/currentUser";
import { CountryDTO } from "src/dtos/edit/country.dto";
import { CountryModel } from "src/model/edit/country.model";
import { PageCountry } from "src/model/edit/country.model";
import { PaginationModel } from "src/model/page.model";
import { JwtAuthGuard } from "src/provides/authGuard";
import { Country } from "src/schemas/edit/country.schema";
import { CommonRes } from "src/utils/commonRes";
import { User } from "src/utils/user";
import { CountryService } from "./country.service";

@Resolver((of) => CountryModel)
export class CountryResolver {
    constructor(private readonly countryService: CountryService) {}

    @Query((returns) => PageCountry)
    @UseGuards(JwtAuthGuard)
    async getCountry(
        @Args({ name: "page", type: () => Int, defaultValue: 1 })
        page: number,
        @Args({ name: "size", type: () => Int, defaultValue: 10 })
        size: number,
        @Args({ name: "name", type: () => String, nullable: true })
        name?: string
    ) {
        const data: Country[] = await this.countryService.queryCountry(
            page,
            size,
            name
        );
        const totalCount: number = await this.countryService.queryCountryCount(
            name
        );
        const res = {
            totalCount,
            data,
        };
        return res;
    }

    @Mutation((returns) => CountryModel)
    @UseGuards(JwtAuthGuard)
    async addCountry(
        @Args({ name: "name", type: () => String }) name: string,
        @CurrentUser() user: User
    ) {
        const country: CountryDTO = {
            name: name,
            createUser: user.id,
            createTime: new Date(),
        };
        const result = await this.countryService.addCountry(country);
        return result;
    }

    @Mutation((returns) => CountryModel)
    @UseGuards(JwtAuthGuard)
    async editCountry(
        @Args({ name: "id", type: () => String }) id: string,
        @Args({ name: "name", type: () => String }) name: string,
        @CurrentUser() user: User
    ) {
        const country: CountryDTO = {
            name: name,
            updateUser: user.id,
            updateTime: new Date(),
        };
        const result = await this.countryService.editCountry(id, country);
        return result;
    }
}

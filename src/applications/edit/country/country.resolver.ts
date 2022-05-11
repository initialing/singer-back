import { UseGuards } from "@nestjs/common";
import { Args, Mutation, ObjectType, Query, Resolver } from "@nestjs/graphql";
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
        @Args({ name: "page", type: () => Number, defaultValue: 1 })
        page: number,
        @Args({ name: "size", type: () => Number, defaultValue: 10 })
        size: number
    ) {
        const data: Country[] = await this.countryService.queryCountry(
            page,
            size
        );
        const totalCount: number =
            await this.countryService.queryCountryCount();
        const res = {
            totalCount,
            data,
        };
        return res;
    }

    @Mutation((returns) => CountryModel)
    @UseGuards(JwtAuthGuard)
    async addCountry(@Args({ name: "name", type: () => String }) name: string) {
        const country: CountryDTO = {
            name: name,
        };
        const result = await this.countryService.addCountry(country);
        return result;
    }
}

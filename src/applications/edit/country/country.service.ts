import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CountryDTO } from "src/dtos/edit/country.dto";
import { Country, CountryDoc } from "src/schemas/edit/country.schema";

@Injectable()
export class CountryService {
    constructor(
        @InjectModel("Country") private countryModel: Model<CountryDoc>
    ) {}

    async addCountry(country: CountryDTO): Promise<Country> {
        const createCountry = new this.countryModel(country);
        return createCountry.save();
    }

    async queryCountry(): Promise<Country[]> {
        const countries: Country[] = await this.countryModel.find(
            {},
            {
                _id: 1,
                name: 1,
            }
        );

        return countries;
    }
}

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

    async queryCountry(page: number, size: number): Promise<Country[]> {
        const countries: Country[] = await this.countryModel
            .find({})
            .skip((page - 1) * size)
            .limit(size);

        return countries;
    }

    async queryCountryCount(): Promise<number> {
        const count: number = await this.countryModel.find().count();

        return count;
    }
}

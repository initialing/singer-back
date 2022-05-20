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

    async editCountry(id: string, country: CountryDTO): Promise<Country> {
        const editCountry = await this.countryModel.findByIdAndUpdate(
            id,
            country
        );
        Object.assign(editCountry, country);
        return editCountry;
    }

    async queryCountry(
        page: number,
        size: number,
        name?: string
    ): Promise<Country[]> {
        const query: any = {
            isDeleted: false,
        };
        if (name) {
            query.name = { $regex: name };
        }
        const countries: Country[] = await this.countryModel
            .find(query)
            .skip((page - 1) * size)
            .limit(size);

        return countries;
    }

    async queryCountryCount(name?: string): Promise<number> {
        const query: any = {
            isDeleted: false,
        };
        if (name) {
            query.name = { $regex: name };
        }
        const count: number = await this.countryModel.find(query).count();

        return count;
    }

    async getCountryList(name: string): Promise<Country[]> {
        const countries: Country[] = await this.countryModel.find({
            name: { $regex: name },
        });
        return countries;
    }
}

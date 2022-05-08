import { Module } from "@nestjs/common";
import { CountryResolver } from "./country.resolver";
import { JwtModule } from "@nestjs/jwt";
import { PrivateConfig } from "config/private";
import { MongooseModule } from "@nestjs/mongoose";
import { Country, CountrySchema } from "src/schemas/edit/country.schema";
import { CountryService } from "./country.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Country.name, schema: CountrySchema },
        ]),
        JwtModule.register({
            signOptions: {
                expiresIn: PrivateConfig.JWT_EXPIRE_TIME,
            },
            secret: PrivateConfig.JWT_SECRET,
        }),
    ],
    providers: [CountryResolver, CountryService],
})
export class CountryModule {}

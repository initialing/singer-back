import { Module } from "@nestjs/common";
import { ArtistModule } from "./artist/artist.module";
import { CountryModule } from "./country/country.module";

@Module({
    imports: [CountryModule, ArtistModule],
})
export class EditModule {}

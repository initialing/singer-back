import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PrivateConfig } from "config/private";
import { Artist, ArtistSchema } from "src/schemas/edit/artist.schema";
import { ArtistResolver } from "./artist.resolver";
import { ArtistService } from "./artist.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Artist.name, schema: ArtistSchema },
        ]),
        JwtModule.register({
            signOptions: {
                expiresIn: PrivateConfig.JWT_EXPIRE_TIME,
            },
            secret: PrivateConfig.JWT_SECRET,
        }),
    ],
    providers: [ArtistService, ArtistResolver],
})
export class ArtistModule {}

import { UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Resolver, Query } from "@nestjs/graphql";
import { CurrentUser } from "src/decorators/currentUser";
import { ArtistDTO } from "src/dtos/edit/artist.dto";
import { ArtistInputModel } from "src/imputModel/edit/artistInput.model";
import { ArtistModel } from "src/model/edit/artist.model";
import { JwtAuthGuard } from "src/provides/authGuard";
import { User } from "src/utils/user";
import { ArtistService } from "./artist.service";

@Resolver((of) => ArtistModel)
export class ArtistResolver {
    constructor(private readonly artistService: ArtistService) {}

    @Mutation((returns) => ArtistModel)
    @UseGuards(JwtAuthGuard)
    async addArtist(
        @Args({ name: "artist", type: () => ArtistInputModel })
        artist: ArtistInputModel,
        @CurrentUser() user: User
    ) {
        artist.createTime = new Date();
        artist.createUser = user.id;
        const res = this.artistService.addArtist(artist);
        return res;
    }

    @Query((returns) => ArtistModel)
    @UseGuards(JwtAuthGuard)
    async getArtistById(
        @Args({ name: "id" }) id: string,
        @CurrentUser() user: User
    ) {
        const res = this.artistService.getArtistById(id);
        return res;
    }
}

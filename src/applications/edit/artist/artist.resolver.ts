import { UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Resolver, Query, Int } from "@nestjs/graphql";
import { CurrentUser } from "src/decorators/currentUser";
import { ArtistDTO } from "src/dtos/edit/artist.dto";
import { ArtistInputModel } from "src/imputModel/edit/artistInput.model";
import { ArtistModel, PageArtist } from "src/model/edit/artist.model";
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

    @Query((returns) => PageArtist)
    @UseGuards(JwtAuthGuard)
    async getArtist(
        @Args({ name: "page", type: () => Int }) page: number,
        @Args({ name: "size", type: () => Int }) size: number,
        @Args({ name: "name", type: () => String, nullable: true })
        name?: string
    ) {
        const data = await this.artistService.getArtist(page, size, name);
        console.log(data);
        const totalCount = await this.artistService.getArtistCount(name);
        const res = {
            data,
            totalCount,
        };
        return res;
    }
}

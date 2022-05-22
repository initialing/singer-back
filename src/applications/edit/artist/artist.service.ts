import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ArtistDTO } from "src/dtos/edit/artist.dto";
import { ArtistModel } from "src/model/edit/artist.model";
import { Artist, ArtistDoc } from "src/schemas/edit/artist.schema";

@Injectable()
export class ArtistService {
    constructor(@InjectModel("Artist") private ArtistModel: Model<ArtistDoc>) {}

    async addArtist(artist: ArtistDTO): Promise<Artist> {
        const createArtist = new this.ArtistModel(artist);
        return createArtist.save();
    }

    async getArtist(
        page: number,
        size: number,
        name?: string
    ): Promise<ArtistModel[]> {
        const query: any = {
            isDeleted: false,
        };
        if (name) {
            query.name = { $regex: name };
        }
        const where = [
            {
                $match: query,
            },
            {
                $lookup: {
                    from: "countries",
                    let: {
                        cid: { $toObjectId: "$countryId" },
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$cid"] },
                            },
                        },
                    ],
                    as: "countries",
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            {
                                country: { $arrayElemAt: ["$countries", 0] },
                            },
                            "$$ROOT",
                        ],
                    },
                },
            },
            {
                $project: {
                    countries: 0,
                },
            },
            {
                $skip: (page - 1) * size,
            },
            {
                $limit: size,
            },
        ];
        const res = await this.ArtistModel.aggregate(where);
        return res;
    }

    async getArtistCount(name?: string): Promise<number> {
        const where: any = {
            isDeleted: false,
        };
        if (name) {
            where.name = { $regex: name };
        }
        const res = await this.ArtistModel.find(where).count();
        return res;
    }
}

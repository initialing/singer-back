import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
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

    async getArtistById(id: string): Promise<ArtistModel> {
        const where = [
            {
                $match: {
                    _id: new Types.ObjectId(id),
                },
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
        ];
        const res = await this.ArtistModel.aggregate(where);
        return res[0];
    }
}

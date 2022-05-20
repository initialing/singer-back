import { NormalDTO } from "../normal.dto";

export class ArtistDTO extends NormalDTO {
    readonly name: string;

    readonly countryId: string;

    readonly sex: 1 | 2 | 3;

    readonly birthday?: Date;

    readonly deadTime?: Date;

    readonly type: 1 | 2;

    readonly activeTime?: Date[][];

    readonly member?: string[];
}

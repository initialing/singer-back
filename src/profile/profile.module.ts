import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Account, AccountShema } from "src/schemas/account.schema";
import { ProfileResolver } from "./profile.resolver";
import { ProfileService } from "./profile.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Account.name, schema: AccountShema },
        ]),
    ],
    providers: [ProfileService, ProfileResolver],
    controllers: [],
})
export class ProfileModule {}

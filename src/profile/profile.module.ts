import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Account, AccountShema } from "src/schemas/account.schema";
import { ProfileResolver } from "./profile.resolver";
import { ProfileService } from "./profile.service";
import { JwtModule } from "@nestjs/jwt";
import { PrivateConfig } from "config/private";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Account.name, schema: AccountShema },
        ]),
        JwtModule.register({
            signOptions: {
                expiresIn: "600s",
            },
            secret: PrivateConfig.JWT_SECRET,
        }),
    ],
    providers: [ProfileService, ProfileResolver],
    controllers: [],
})
export class ProfileModule {}

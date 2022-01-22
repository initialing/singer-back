import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrivateConfig } from "config/private";
import { MainResolver } from "./main.resolver";

@Module({
    imports: [
        JwtModule.register({
            signOptions: {
                expiresIn: PrivateConfig.JWT_EXPIRE_TIME,
            },
            secret: PrivateConfig.JWT_SECRET,
        }),
    ],
    providers: [MainResolver],
    controllers: [],
})
export class MainModule {}

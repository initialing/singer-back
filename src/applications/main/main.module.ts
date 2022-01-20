import { Module } from "@nestjs/common";
// import { JWTStrategy } from "src/provides/jwt.strategy";
import { MainResolver } from "./main.resolver";

@Module({
    imports: [],
    providers: [MainResolver],
    controllers: [],
})
export class MainModule {}

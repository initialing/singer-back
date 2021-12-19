import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { join } from "path";
import { ProfileModule } from "src/profile/profile.module";
import { JWTStrategy } from "src/provides/jwt.strategy";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { JwtModule } from "@nestjs/jwt";
import { PrivateConfig } from "config/private";

@Module({
    imports: [
        ProfileModule,
        ConfigModule.forRoot({
            envFilePath: "./config/.development.env",
        }),
        MongooseModule.forRoot(process.env.DATABASE_URL, {
            authSource: "admin",
        }),
        GraphQLModule.forRoot({
            path: "/singer",
            debug: false,
            playground: false,
            sortSchema: true,
            autoSchemaFile: join(process.cwd(), "/src/schema.gql"),
            context: ({ req, res }) => ({ req, res }),
        }),
        JwtModule.register({
            signOptions: {
                expiresIn: PrivateConfig.JWT_EXPIRE_TIME,
            },
            secret: PrivateConfig.JWT_SECRET,
        }),
    ],
    controllers: [AppController],
    providers: [AppService, JWTStrategy],
})
export class AppModule {}

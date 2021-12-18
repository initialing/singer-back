import { Injectable, Res } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { PrivateConfig } from "config/private";
import { Response } from "express";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: PrivateConfig.JWT_SECRET,
        });
    }

    async validate(payload, @Res() res: Response) {
        console.log("resssss=>", res.getHeader);
        return { userName: payload.userName };
    }
}

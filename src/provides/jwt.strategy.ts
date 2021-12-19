import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { PrivateConfig } from "config/private";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: PrivateConfig.JWT_SECRET,
        });
    }

    async validate(payload) {
        return { userName: payload.userName, expireTime: payload.expireTime };
    }
}

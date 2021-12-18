import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { PrivateConfig } from "config/private";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    constructor(private readonly jwtService: JwtService) {
        super();
    }
    handleRequest(err: any, user: any, info: any, context: any) {
        const token = this.jwtService.sign(
            { userName: user.account },
            {
                secret: PrivateConfig.JWT_SECRET,
                expiresIn: "60s",
            }
        );
        context.args[0].res.header("access-token", token);
        return user;
    }
}

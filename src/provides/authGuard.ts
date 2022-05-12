import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { PrivateConfig } from "config/private";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    constructor(private readonly jwtService: JwtService) {
        super();
    }
    handleRequest(err: any, user: any, info: any, context: any) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        if (user.expireTime <= new Date().getTime()) {
            const token = this.jwtService.sign(
                {
                    id: user.id,
                    userName: user.account,
                    expireTime:
                        new Date().getTime() + PrivateConfig.JWT_REFRESH_TIME,
                },
                {
                    secret: PrivateConfig.JWT_SECRET,
                    expiresIn: PrivateConfig.JWT_EXPIRE_TIME,
                }
            );
            this.getResponse(context).header("access-token", token);
        }
        return user;
    }

    getRequest(context: ExecutionContext) {
        if (context.getType().toString() === "graphql") {
            const ctx = GqlExecutionContext.create(context);
            return ctx.getContext().req;
        } else {
            return context.switchToHttp().getRequest();
        }
    }

    getResponse(context: ExecutionContext) {
        if (context.getType().toString() === "graphql") {
            const ctx = GqlExecutionContext.create(context);
            return ctx.getContext().res;
        } else {
            return context.switchToHttp().getResponse();
        }
    }
}

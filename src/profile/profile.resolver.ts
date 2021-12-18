import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ResCode } from "../enums/rescode.enum";
import { CommonRes } from "../utils/commonRes";
import { AccountModel } from "../model/account.model";
import { ProfileService } from "./profile.service";
import { HmacMD5 } from "crypto-js";
import { ResDes } from "src/enums/resdes.enum";
import { Account } from "src/schemas/account.schema";
import { NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWT } from "src/utils/jwt";

@Resolver((of) => AccountModel)
export class ProfileResolver {
    constructor(
        private readonly profileService: ProfileService,
        private readonly jwtService: JwtService
    ) {}
    @Query((returns) => AccountModel)
    async login(
        @Args("account") account: string,
        @Args("password") password: string,
        @Context() ctx
    ) {
        const MD5Pass = HmacMD5(password, account).toString();
        const res: Account = await this.profileService.getUserByAccount(
            account,
            MD5Pass
        );
        if (!res._id) {
            throw new NotFoundException(account);
        }
        const JWTLoad: JWT = {
            userName: account,
            expireTime: new Date().getTime() + 10000,
        };
        const token = this.jwtService.sign(JWTLoad);
        ctx.res.header("access-token", token);
        return res;
    }

    @Mutation((returns) => CommonRes)
    async changePassword(
        @Args({ name: "account", type: () => String }) account: string,
        @Args({ name: "password", type: () => String }) password: string,
        @Context() ctx
    ) {
        const MD5Pass = HmacMD5(password, account).toString();
        const res = await this.profileService.changePassword(account, MD5Pass);
        if (res > 0) {
            return new CommonRes(ResCode.SUCCESS, ResDes.SUCCESS);
        }
        throw new CommonRes(ResCode.FAIL, ResDes.FAIL);
    }
}

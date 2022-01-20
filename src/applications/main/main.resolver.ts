import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { CurrentUser } from "src/decorators/currentUser";
import { JwtAuthGuard } from "src/provides/authGuard";
import { CommonRes } from "src/utils/commonRes";
import { User } from "src/utils/user";

@Resolver((of) => CommonRes)
export class MainResolver {
    @Query((returns) => CommonRes)
    @UseGuards(JwtAuthGuard)
    getMain(@CurrentUser() user: User) {
        return new CommonRes(200, "success " + user.userName);
    }

    @Query((returns) => CommonRes)
    getHistorySameDate() {
        return new CommonRes(200, "success getHistorySameDate");
    }
}

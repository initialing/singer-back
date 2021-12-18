import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/provides/authGuard";
import { AppService } from "./app.service";

// 后台使用 GraphQL, 这个 controller 就简单当做示例
@Controller("app")
export class AppController {
    constructor(private readonly appService: AppService) {}

    @UseGuards(JwtAuthGuard)
    @Get("get")
    getHello(@Query("id") id: string, @Req() req): string {
        console.log(req.user);
        return this.appService.getHello(id);
    }
}

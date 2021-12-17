import { Controller, Get, Query } from "@nestjs/common";
import { AppService } from "./app.service";

// 后台使用 GraphQL, 这个 controller 就简单当做示例
@Controller("app")
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get("get")
    getHello(@Query("id") id: string): string {
        return this.appService.getHello(id);
    }
}

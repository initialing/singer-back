import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { SetHeaderMiddleWare } from "./middleWare/setheader.middleware";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(SetHeaderMiddleWare);
    await app.listen(3000);
}
bootstrap();

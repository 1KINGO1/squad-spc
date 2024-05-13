import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initApp } from "./init-app";
import config from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initApp(app);
  await app.listen(config.PORT);
}
bootstrap();

import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser';
import config from "./config";

export function initApp(app: INestApplication<any>) {
  app.setGlobalPrefix(config.API_PREFIX);
  app.use(cookieParser());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
      transformOptions: {enableImplicitConversion: true},
      forbidNonWhitelisted: true
    }
  ));
}

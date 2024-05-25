import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser';

export function initApp(app: INestApplication<any>) {
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
}
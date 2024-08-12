import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initApp } from "./init-app";
import { RecordsService } from "./records/records.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  initApp(app);
  await app.listen(3000);

  const recordsService = app.get(RecordsService);
  setInterval(() => {
    recordsService.deleteExpiredRecords();
  }, 1000 * 60);
}
bootstrap();

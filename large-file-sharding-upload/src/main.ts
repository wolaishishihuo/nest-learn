import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { mkdirSync } from 'fs';
import path from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const projectRoot = path.resolve(__dirname, '..');
  const imagesDirPath = path.join(projectRoot, 'images');
  try {
    mkdirSync(imagesDirPath);
  } catch (error) {}
  await app.listen(3000);
}
bootstrap();

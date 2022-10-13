import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * This is the stand alone version of nestjs project with just using nestjs Ioc Container
 * and doesn't offer HTTP handling
 * In this version, we have to consumer with related consumer group
 * for fetch data from streams by name  useractivity and exception,
 * Storing them in collections activity and exception in mongo database
 *
 */
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
}
bootstrap();

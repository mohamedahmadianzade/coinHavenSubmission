import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisStreamStrategy } from '@mark_hoog/redis-streams-transport';
import {ConfigService} from '@nestjs/config'
async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.createMicroservice(AppModule, {
    strategy: new RedisStreamStrategy({
      url: configService.get("REDIS_ADDRESS"),
      consumerGroup: configService.get("REDIS_CONSUMER_GROUP"),
      consumer: configService.get("REDIS_CONSUMER_NAME"),
    }),
  });
  await app.listen();
}
bootstrap();

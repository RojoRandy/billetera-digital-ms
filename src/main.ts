import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './shared/infrastructure/config/envs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Billetera Microservice');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: envs.NATS_SERVERS
      }
    }
  )
  await app.listen();
  logger.log(`Billetera Microservice is running on port ${envs.PORT}`);
}
bootstrap();

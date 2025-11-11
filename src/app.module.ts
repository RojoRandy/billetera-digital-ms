import { Module } from '@nestjs/common';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { eventBusDefinition } from './shared/domain/service/event-bus.service';
import { EventEmitterService } from './shared/infrastructure/service/event-emitter.service';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './shared/infrastructure/config/envs';
import { NatsModule } from './shared/infrastructure/broker/nats.module';
import { ClienteModule } from './cliente/infrastructure/module/cliente.module';

@Module({
  imports: [
    MongooseModule.forRoot(envs.MONGODB_URI),
    NatsModule,
    EventEmitterModule.forRoot(),
    EventEmitter2,
    ClienteModule
  ],
  providers: [
    {
      provide: eventBusDefinition.name,
      useClass: EventEmitterService
    }
  ],
  exports: [
    {
      provide: eventBusDefinition.name,
      useClass: EventEmitterService
    }
  ]
})
export class AppModule {}

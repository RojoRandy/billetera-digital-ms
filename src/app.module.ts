import { Module } from '@nestjs/common';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { eventBusDefinition } from './shared/domain/service/event-bus.service';
import { EventEmitterService } from './shared/infrastructure/service/event-emitter.service';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './shared/infrastructure/config/envs';

@Module({
  imports: [
    MongooseModule.forRoot(envs.MONGODB_URI),
    EventEmitterModule.forRoot(),
    EventEmitter2
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

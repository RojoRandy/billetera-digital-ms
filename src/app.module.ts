import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { eventBusDefinition } from './shared/domain/service/event-bus.service';
import { EventEmitterService } from './shared/infrastructure/event-emitter.service';

@Module({
  imports: [
    EventEmitterModule.forRoot()
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

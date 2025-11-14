import { Global, Module } from '@nestjs/common';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { eventBusDefinition } from './shared/domain/service/event-bus.service';
import { EventEmitterService } from './shared/infrastructure/service/event-emitter.service';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './shared/infrastructure/config/envs';
import { NatsModule } from './shared/infrastructure/broker/nats.module';
import { ClienteModule } from './cliente/infrastructure/module/cliente.module';
import { BilleteraModule } from './billetera/infrastructure/module/billetera.module';
import { mailerDefinition } from './shared/domain/service/mailer.service';
import { MailerService } from './shared/infrastructure/mail/service/mailer.service';
import { CompraModule } from './compra/infrastructure/module/compra.module';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(envs.MONGODB_URI),
    NatsModule,
    EventEmitterModule.forRoot(),
    EventEmitter2,
    ClienteModule,
    BilleteraModule,
    CompraModule
  ],
  providers: [
    {
      provide: eventBusDefinition.name,
      useClass: EventEmitterService
    },
    {
      provide: mailerDefinition.name,
      useClass: MailerService
    }
  ],
  exports: [
    {
      provide: eventBusDefinition.name,
      useClass: EventEmitterService
    },
    {
      provide: mailerDefinition.name,
      useClass: MailerService
    }
  ]
})
export class AppModule {}

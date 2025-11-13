import { Global, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { NATS_SERVICE } from "../config/constants";
import { envs } from "../config/envs";

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.NATS_SERVERS
        },
      }
    ])
  ],
  exports: [
    ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.NATS_SERVERS
        },
      }
    ])
  ]
})
export class NatsModule {}
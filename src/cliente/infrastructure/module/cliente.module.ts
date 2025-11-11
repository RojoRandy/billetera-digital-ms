import { Module } from "@nestjs/common";
import { ClienteRepositoryImpl } from "../repository/cliente.repository";
import { clienteRepositoryDefinition, ClienteRepository } from "src/cliente/domain/repository/cliente.repository";


@Module({
  imports: [],
  controllers: [],
  providers: [
    ClienteRepositoryImpl,
    {
      provide: clienteRepositoryDefinition.name,
      useClass: ClienteRepositoryImpl,
    }
  ]
})
export class ClienteModule {}
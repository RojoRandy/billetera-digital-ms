import { Module } from "@nestjs/common";
import { ClienteRepositoryImpl } from "../repository/cliente.repository";
import { clienteRepositoryDefinition, ClienteRepository } from "src/cliente/domain/repository/cliente.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { ClienteModel, ClienteSchema } from "../schema/cliente-model.schema";
import { RegistrarClienteUseCase } from "src/cliente/application/use-case/registrar-cliente.use-case";
import { RegistrarClienteController } from "../controller/registrar-cliente.controller";
import { CrearBilleteraCliente } from "src/cliente/domain/listener/crear-billetera-cliente.listener";
import { CrearBilleteraClienteSubscriber } from "../subscriber/crear-billetera-cliente.subscriber";


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ClienteModel.name,
        schema: ClienteSchema
      }
    ])
  ],
  controllers: [
    RegistrarClienteController
  ],
  providers: [
    RegistrarClienteUseCase,
    CrearBilleteraCliente,
    CrearBilleteraClienteSubscriber,
    ClienteRepositoryImpl,
    {
      provide: clienteRepositoryDefinition.name,
      useClass: ClienteRepositoryImpl,
    }
  ]
})
export class ClienteModule {}
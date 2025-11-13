import { Module } from "@nestjs/common";
import { ClienteRepositoryImpl } from "../repository/cliente.repository";
import { clienteRepositoryDefinition, ClienteRepository } from "src/cliente/domain/repository/cliente.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { ClienteModel, ClienteSchema } from "../schema/cliente-model.schema";
import { RegistrarClienteUseCase } from "src/cliente/application/use-case/registrar-cliente.use-case";
import { RegistrarClienteController } from "../controller/registrar-cliente.controller";
import { CrearBilleteraCliente } from "src/cliente/domain/listener/crear-billetera-cliente.listener";
import { CrearBilleteraClienteSubscriber } from "../subscriber/crear-billetera-cliente.subscriber";
import { CrearBilleteraClienteUseCase } from "src/billetera/application/use-case/crear-billetera.use-case";
import { BilleteraModel, BilleteraSchema } from "src/billetera/infrastructure/schema/billetera-model.schema";
import { BilleteraRepositoryImpl } from "src/billetera/infrastructure/repository/billetera.repository";
import { billeteraRepositoryDefinition } from "src/billetera/domain/repository/billetera.repository";
import { ConsultarClienteController } from "../controller/consultar-cliente.controller";
import { ConsultarClienteUseCase } from "src/cliente/application/use-case/consultar-cliente.use-case";


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ClienteModel.name,
        schema: ClienteSchema
      },
      {
        name: BilleteraModel.name,
        schema: BilleteraSchema
      }
    ])
  ],
  controllers: [
    RegistrarClienteController,
    ConsultarClienteController
  ],
  providers: [
    RegistrarClienteUseCase,
    ConsultarClienteUseCase,
    CrearBilleteraCliente,
    CrearBilleteraClienteSubscriber,
    {
      provide: CrearBilleteraClienteUseCase.name,
      useClass: CrearBilleteraClienteUseCase
    },
    ClienteRepositoryImpl,
    {
      provide: clienteRepositoryDefinition.name,
      useClass: ClienteRepositoryImpl,
    },
    BilleteraRepositoryImpl,
    {
      provide: billeteraRepositoryDefinition.name,
      useClass: BilleteraRepositoryImpl
    }
  ]
})
export class ClienteModule {}
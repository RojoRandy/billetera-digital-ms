import { Module } from "@nestjs/common";
import { CompraModel, CompraSchema } from "../schema/compra-model.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { CompraRepositoryImpl } from "../repository/compra.repository";
import { compraRepositoryDefinition } from "src/compra/dominio/repository/compra.repository";
import { RegistrarCompraUseCase } from "src/compra/application/use-case/registrar-compra.use-case";
import { EnviarCorreoClienteSubscriber } from "../subscriber/enviar-correo-cliente.subscriber";
import { EnviarCorreoCliente } from "src/compra/dominio/listener/enviar-correo-cliente.listener";
import { ClienteModel, ClienteSchema } from "src/cliente/infrastructure/schema/cliente-model.schema";
import { ClienteRepositoryImpl } from "src/cliente/infrastructure/repository/cliente.repository";
import { clienteRepositoryDefinition } from "src/cliente/domain/repository/cliente.repository";
import { RegistrarCompraController } from "../controller/registrar-compra.controller";
import { ConfirmarCompraController } from "../controller/confirmar-compra.controller";
import { ConfirmarCompraUseCase } from "src/compra/application/use-case/confirmar-compra.use-case";
import { BilleteraModel, BilleteraSchema } from "src/billetera/infrastructure/schema/billetera-model.schema";
import { BilleteraRepositoryImpl } from "src/billetera/infrastructure/repository/billetera.repository";
import { billeteraRepositoryDefinition } from "src/billetera/domain/repository/billetera.repository";


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CompraModel.name,
        schema: CompraSchema
      },
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
    RegistrarCompraController,
    ConfirmarCompraController
  ],
  providers: [
    RegistrarCompraUseCase,
    ConfirmarCompraUseCase,
    EnviarCorreoCliente,
    EnviarCorreoClienteSubscriber,
    CompraRepositoryImpl,
    {
      provide: compraRepositoryDefinition.name,
      useClass: CompraRepositoryImpl
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
export class CompraModule{}
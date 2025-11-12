import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CrearBilleteraClienteUseCase } from "src/billetera/application/use-case/crear-billetera.use-case";
import { BilleteraModel, BilleteraSchema } from "../schema/billetera-model.schema";
import { BilleteraRepositoryImpl } from "../repository/billetera.repository";
import { billeteraRepositoryDefinition } from "src/billetera/domain/repository/billetera.repository";


@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: BilleteraModel.name,
        schema: BilleteraSchema
      }
    ])
  ],
  controllers: [],
  providers: [
    {
      provide: CrearBilleteraClienteUseCase.name,
      useClass: CrearBilleteraClienteUseCase
    },
    BilleteraRepositoryImpl,
    {
      provide: billeteraRepositoryDefinition.name,
      useClass: BilleteraRepositoryImpl,
    }
  ],
  exports: [
    {
      provide: CrearBilleteraClienteUseCase.name,
      useClass: CrearBilleteraClienteUseCase
    },
  ]
})
export class BilleteraModule {}
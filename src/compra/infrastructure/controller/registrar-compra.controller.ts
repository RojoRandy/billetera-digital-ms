import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { RegistrarCompraUseCase } from "src/compra/application/use-case/registrar-compra.use-case";
import { COMPRA_REGISTRO } from "../message/compra.message";
import { RegistrarCompraDto } from "../dto/registrar-compra.dto";
import { DocumentoCliente } from "src/cliente/domain/value-object/documento-cliente.value-object";
import { TotalCompra } from "src/compra/dominio/value-object/total-compra.value-object";
import { CompraResponse } from "src/compra/application/presentation/compra.presentation";

@Controller()
export class RegistrarCompraController {
  constructor(private readonly registrarCompraUseCase: RegistrarCompraUseCase){}

  @MessagePattern(COMPRA_REGISTRO)
  public async execute(@Payload() payload: RegistrarCompraDto): Promise<CompraResponse> {
    return this.registrarCompraUseCase.execute({
      documento: DocumentoCliente.fromString(payload.documento),
      total: TotalCompra.fromNumber(payload.total),
    })
  }
}
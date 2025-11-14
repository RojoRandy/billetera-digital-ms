import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { COMPRA_CONFIRMAR } from "../message/compra.message";
import { ConfirmarCompraUseCase } from "src/compra/application/use-case/confirmar-compra.use-case";
import { ConfirmarCompraDto } from "../dto/confirmar-compra.dto";
import { IdSesionCompra } from "src/compra/dominio/value-object/id-sesion-compra.value-object";
import { TokenCompra } from "src/compra/dominio/value-object/token-compra.value-object";

@Controller()
export class ConfirmarCompraController {
  constructor(private readonly confirmarCompraUseCase: ConfirmarCompraUseCase){}

  @MessagePattern(COMPRA_CONFIRMAR)
  public async execute(@Payload() payload: ConfirmarCompraDto): Promise<boolean> {
    await this.confirmarCompraUseCase.execute(
      IdSesionCompra.fromString(payload.idSesion),
      TokenCompra.fromString(payload.token),
    )

    return true;
  }
}
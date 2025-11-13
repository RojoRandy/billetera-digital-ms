import { MessagePattern, Payload } from "@nestjs/microservices";
import { RecargarSaldoUseCase } from "src/billetera/application/use-case/recargar-saldo.use-case";
import { RecargarSaldoDto } from "../dto/recargar-saldo.dto";
import { DocumentoCliente } from "src/cliente/domain/value-object/documento-cliente.value-object";
import { CelularCliente } from "src/cliente/domain/value-object/celular-cliente.value-object";
import { CantidadBilletera } from "src/billetera/domain/value-object/cantidad-billetera.value-object";
import { BILLETERA_RECARGAR_SALDO } from "../message/billetera.message";
import { Controller } from "@nestjs/common";
import { BilleteraResponse } from "src/billetera/application/presentation/billetera.presentation";


@Controller("billeteras/recargar-saldo")
export class RecargarSaldoController {
  constructor(
    private readonly recargarSaldoUseCase: RecargarSaldoUseCase
  ){}

  @MessagePattern(BILLETERA_RECARGAR_SALDO)
  public async execute(@Payload() payload: RecargarSaldoDto): Promise<BilleteraResponse> {
    return this.recargarSaldoUseCase.execute(
      DocumentoCliente.fromString(payload.documento),
      CelularCliente.fromString(payload.celular),
      CantidadBilletera.fromNumber(payload.cantidad),
    )
  }
}
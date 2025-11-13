import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ConsultarSaldoUseCase } from "src/billetera/application/use-case/consultar-saldo.use-case";
import { BILLETERA_CONSULTAR_SALDO } from "../message/billetera.message";
import { ConsultarSaldoDto } from "../dto/consultar-saldo.dto";
import { BilleteraResponse } from "src/billetera/application/presentation/billetera.presentation";
import { DocumentoCliente } from "src/cliente/domain/value-object/documento-cliente.value-object";
import { CelularCliente } from "src/cliente/domain/value-object/celular-cliente.value-object";

@Controller("billeteras/consultar-saldo")
export class ConsultarSaldoController {
  constructor(private readonly consultarSaldoUseCase: ConsultarSaldoUseCase) {}

  @MessagePattern(BILLETERA_CONSULTAR_SALDO)
  public async execute(@Payload() payload: ConsultarSaldoDto): Promise<BilleteraResponse> {
    return this.consultarSaldoUseCase.execute(
      DocumentoCliente.fromString(payload.documento),
      CelularCliente.fromString(payload.celular),
    )
  }
}
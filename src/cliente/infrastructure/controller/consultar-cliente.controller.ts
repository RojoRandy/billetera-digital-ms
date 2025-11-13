import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ConsultarClienteUseCase } from "src/cliente/application/use-case/consultar-cliente.use-case";
import { DocumentoCliente } from "src/cliente/domain/value-object/documento-cliente.value-object";
import { ConsultarClienteDto } from "../dto/consultar-cliente.dto";
import { ClienteResponse } from "src/cliente/application/presentation/cliente.presentation";
import { CLIENTES_CONSULTA } from "../message/cliente.message";

@Controller("clientes/consultar-cliente")
export class ConsultarClienteController {
  constructor(private readonly consultarClienteUseCase: ConsultarClienteUseCase){}

  @MessagePattern(CLIENTES_CONSULTA)
  public async execute(@Payload() payload: ConsultarClienteDto): Promise<ClienteResponse> {
    return this.consultarClienteUseCase.execute(
      DocumentoCliente.fromString(payload.documento)
    )
  }
}
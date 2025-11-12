import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { RegistrarClienteUseCase } from "src/cliente/application/use-case/registrar-cliente.use-case";
import { RegistrarClienteDto } from "../dto/registrar-cliente.dto";
import { DocumentoCliente } from "src/cliente/domain/value-object/documento-cliente.value-object";
import { NombresCliente } from "src/cliente/domain/value-object/nombres-cliente.value-object";
import { EmailCliente } from "src/cliente/domain/value-object/email-cliente.value-object";
import { CelularCliente } from "src/cliente/domain/value-object/celular-cliente.value-object";
import { CLIENTES_REGISTRO } from "../message/cliente.message";

@Controller("clientes/registrar")
export class RegistrarClienteController {
  constructor(private readonly registrarClienteUseCase: RegistrarClienteUseCase) {}

  @MessagePattern(CLIENTES_REGISTRO)
  public async execute(@Payload() payload: RegistrarClienteDto): Promise<any> {
    await this.registrarClienteUseCase.execute(
      DocumentoCliente.fromString(payload.documento),
      NombresCliente.fromString(payload.nombres),
      EmailCliente.fromString(payload.email),
      CelularCliente.fromString(payload.celular)
    );

    return null
  }
}
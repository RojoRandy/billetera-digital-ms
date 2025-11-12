import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CLIENTE_CREADO_EVENT, ClienteCreado } from "src/cliente/domain/event/cliente-creado.event";
import { CrearBilleteraCliente } from "src/cliente/domain/listener/crear-billetera-cliente.listener";

@Injectable()
export class CrearBilleteraClienteSubscriber {
  public constructor(
    private readonly crearBilleteraCliente: CrearBilleteraCliente
  ){}

  @OnEvent(CLIENTE_CREADO_EVENT, { async: true })
  async handleClienteCreadoEvent(clienteCreado: ClienteCreado) {
    await this.crearBilleteraCliente.execute(clienteCreado)
  }
}
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { COMPRA_CREADA_EVENT, CompraCreada } from "src/compra/dominio/event/compra-creada.event";
import { EnviarCorreoCliente } from "src/compra/dominio/listener/enviar-correo-cliente.listener";

@Injectable()
export class EnviarCorreoClienteSubscriber {
  public constructor(
    private readonly enviarCorreoCliente: EnviarCorreoCliente
  ){}

  @OnEvent(COMPRA_CREADA_EVENT, { async: true })
  async handleCompraCreadaEvent(compraCreada: CompraCreada) {
    await this.enviarCorreoCliente.execute(compraCreada)
  }
}
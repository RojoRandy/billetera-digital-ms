import { Inject } from "@nestjs/common";
import { type BilleteraRepository, billeteraRepositoryDefinition } from "src/billetera/domain/repository/billetera.repository";
import { CantidadBilletera } from "src/billetera/domain/value-object/cantidad-billetera.value-object";
import { type ClienteRepository, clienteRepositoryDefinition } from "src/cliente/domain/repository/cliente.repository";
import { compraRepositoryDefinition, type CompraRepository } from "src/compra/dominio/repository/compra.repository";
import { IdSesionCompra } from "src/compra/dominio/value-object/id-sesion-compra.value-object";
import { TokenCompra } from "src/compra/dominio/value-object/token-compra.value-object";
import { eventBusDefinition, type EventBus } from "src/shared/domain/service/event-bus.service";


export class ConfirmarCompraUseCase {
  constructor(
    @Inject(compraRepositoryDefinition.name)
    private readonly compraRepository: CompraRepository,
    @Inject(clienteRepositoryDefinition.name)
    private readonly clienteRepository: ClienteRepository,
    @Inject(billeteraRepositoryDefinition.name)
    private readonly billeteraRepository: BilleteraRepository,
    @Inject(eventBusDefinition.name)
    private readonly eventBus: EventBus
  ){}

  public async execute(idSesion: IdSesionCompra, token: TokenCompra): Promise<void> {
    const compra = await this.compraRepository.findByCompraPendiente(idSesion);
    const cliente = await this.clienteRepository.findByDocumento(compra.documento);
    const billetera = await this.billeteraRepository.findByDatosCliente(cliente.documento, cliente.celular);

    compra.confirmarCompra(token);

    billetera.restarSaldo(
      CantidadBilletera.fromNumber(compra.obtenerTotal())
    )

    //TODO: Implementar manejo de transacciones
    await this.compraRepository.updateEstado(compra)
    await this.billeteraRepository.updateCantidad(billetera)

    this.eventBus.publish(compra.pullEvents())
  }
}
import { Inject } from "@nestjs/common";
import { type BilleteraRepository, billeteraRepositoryDefinition } from "src/billetera/domain/repository/billetera.repository";
import { CantidadBilletera } from "src/billetera/domain/value-object/cantidad-billetera.value-object";
import { CelularCliente } from "src/cliente/domain/value-object/celular-cliente.value-object";
import { DocumentoCliente } from "src/cliente/domain/value-object/documento-cliente.value-object";
import { type EventBus, eventBusDefinition } from "src/shared/domain/service/event-bus.service";
import { BilleteraPresentation, BilleteraResponse } from "../presentation/billetera.presentation";


export class RecargarSaldoUseCase {
  constructor(
    @Inject(billeteraRepositoryDefinition.name)
    private readonly billeteraRepository: BilleteraRepository,
    @Inject(eventBusDefinition.name)
    private readonly eventBus: EventBus,
  ) {}

  public async execute(documento: DocumentoCliente, celular: CelularCliente, cantidad: CantidadBilletera): Promise<BilleteraResponse> {
    const billetera = await this.billeteraRepository.findByDatosCliente(
      documento, 
      celular
    );

    billetera.recargarSaldo(cantidad);

    await this.billeteraRepository.updateCantidad(billetera);
    this.eventBus.publish(billetera.pullEvents())

    return BilleteraPresentation.fromBilletera(billetera).format()
  }
}
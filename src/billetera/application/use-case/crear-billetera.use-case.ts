import { Inject } from "@nestjs/common";
import { Billetera } from "src/billetera/domain/entity/billetera.entity";
import { type BilleteraRepository, billeteraRepositoryDefinition } from "src/billetera/domain/repository/billetera.repository";
import { CelularCliente } from "src/cliente/domain/value-object/celular-cliente.value-object";
import { DocumentoCliente } from "src/cliente/domain/value-object/documento-cliente.value-object";
import { type EventBus, eventBusDefinition } from "src/shared/domain/service/event-bus.service";

export class CrearBilleteraClienteUseCase {

  constructor(
    @Inject(billeteraRepositoryDefinition.name)
    private readonly billeteraRepository: BilleteraRepository,
    @Inject(eventBusDefinition.name)
    private readonly eventBus: EventBus,
  ){}

  public async execute(documento: DocumentoCliente, celular: CelularCliente): Promise<void> {
    const billetera = Billetera.create({
      documento: documento,
      celular: celular
    });

    await this.billeteraRepository.create(billetera);
    this.eventBus.publish(billetera.pullEvents())
  }
}
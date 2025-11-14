import { Inject } from "@nestjs/common";
import { DocumentoCliente } from "src/cliente/domain/value-object/documento-cliente.value-object";
import { Compra } from "src/compra/dominio/entity/compra.entity";
import { type CompraRepository, compraRepositoryDefinition } from "src/compra/dominio/repository/compra.repository";
import { TotalCompra } from "src/compra/dominio/value-object/total-compra.value-object";
import { type EventBus, eventBusDefinition } from "src/shared/domain/service/event-bus.service";
import { CompraPresentation, CompraResponse } from "../presentation/compra.presentation";


export class RegistrarCompraUseCase {
  constructor(
    @Inject(compraRepositoryDefinition.name)
    private readonly compraRepository: CompraRepository,
    @Inject(eventBusDefinition.name)
    private readonly eventBus: EventBus
  ){}

  public async execute({
    documento,
    total
  }: {
    documento: DocumentoCliente
    total: TotalCompra
  }): Promise<CompraResponse> {
    const compra = Compra.create({
      documento,
      total
    });

    await this.compraRepository.create(compra)
    this.eventBus.publish(compra.pullEvents())

    return CompraPresentation.fromCompra(compra).format()
  }
}
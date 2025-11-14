import { DomainEvent } from "src/shared/domain/event/domain-event";
import { Uuid } from "src/shared/domain/value-object/uuid.value-object";
import { Compra } from "../entity/compra.entity";
import { EstadoCompra } from "../value-object/estado-compra.value-object";

export const COMPRA_CONFIRMADA_EVENT = 'compra.confirmada'

export class CompraConfirmada implements DomainEvent {
  public readonly eventId: Uuid;
  public readonly name = COMPRA_CONFIRMADA_EVENT;
  public readonly occurredOn: Date;

  public constructor(
    public readonly compra: Compra,
    public readonly estadoAnterior: EstadoCompra,
    public readonly estadoNuevo: EstadoCompra,
  ) {
    this.eventId = Uuid.create();
    this.occurredOn = new Date();
  }
}
import { DomainEvent } from "src/shared/domain/event/domain-event";
import { Uuid } from "src/shared/domain/value-object/uuid.value-object";
import { Compra } from "../entity/compra.entity";

export const COMPRA_CREADA_EVENT = 'compra.creada'

export class CompraCreada implements DomainEvent {
  public readonly eventId: Uuid;
  public readonly name = COMPRA_CREADA_EVENT;
  public readonly occurredOn: Date;

  public constructor(public readonly compra: Partial<Compra>) {
    this.eventId = Uuid.create();
    this.occurredOn = new Date();
  }
}
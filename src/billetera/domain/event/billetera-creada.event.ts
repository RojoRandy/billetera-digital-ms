import { DomainEvent } from "src/shared/domain/event/domain-event";
import { Uuid } from "src/shared/domain/value-object/uuid.value-object";
import { Billetera } from "../entity/billetera.entity";

export const BILLETERA_CREADA_EVENT = 'billetera.creada'

export class BilleteraCreada implements DomainEvent {
  public readonly eventId: Uuid;
  public readonly name = BILLETERA_CREADA_EVENT;
  public readonly occurredOn: Date;

  public constructor(public readonly billetera: Partial<Billetera>) {
    this.eventId = Uuid.create();
    this.occurredOn = new Date();
  }
}
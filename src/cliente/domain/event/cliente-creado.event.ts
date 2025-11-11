import { DomainEvent } from "src/shared/domain/event/domain-event";
import { Uuid } from "src/shared/domain/value-object/uuid.value-object";
import { Cliente } from "../entity/cliente.entity";

export class ClienteCreado implements DomainEvent {
  public readonly eventId: Uuid;
  public readonly name: 'cliente.creado';
  public readonly occurredOn: Date;

  public constructor(public readonly cliente: Partial<Cliente>) {
    this.eventId = Uuid.create();
    this.occurredOn = new Date();
  }
}
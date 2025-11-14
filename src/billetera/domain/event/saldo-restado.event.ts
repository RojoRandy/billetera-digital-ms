import { DomainEvent } from "src/shared/domain/event/domain-event";
import { Uuid } from "src/shared/domain/value-object/uuid.value-object";
import { Billetera } from "../entity/billetera.entity";
import { CantidadBilletera } from "../value-object/cantidad-billetera.value-object";

export const SALDO_RESTADO_EVENT = 'billetera.saldo_restado'

export class SaldoRestado implements DomainEvent {
  public readonly eventId: Uuid;
  public readonly name = SALDO_RESTADO_EVENT;
  public readonly occurredOn: Date;

  public constructor(
    public readonly billetera: Billetera, 
    public readonly cantidadRestada: CantidadBilletera,
    public readonly nuevoSaldo: CantidadBilletera
  ) {
    this.eventId = Uuid.create();
    this.occurredOn = new Date();
  }
}
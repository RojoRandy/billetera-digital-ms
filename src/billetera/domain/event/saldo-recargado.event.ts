import { DomainEvent } from "src/shared/domain/event/domain-event";
import { Uuid } from "src/shared/domain/value-object/uuid.value-object";
import { Billetera } from "../entity/billetera.entity";
import { CantidadBilletera } from "../value-object/cantidad-billetera.value-object";

export const SALDO_RECARGADO_EVENT = 'billetera.saldo_recargado'

export class SaldoRecargado implements DomainEvent {
  public readonly eventId: Uuid;
  public readonly name = SALDO_RECARGADO_EVENT;
  public readonly occurredOn: Date;

  public constructor(
    public readonly billetera: Billetera, 
    public readonly cantidadRecargada: CantidadBilletera,
    public readonly nuevoSaldo: CantidadBilletera
  ) {
    this.eventId = Uuid.create();
    this.occurredOn = new Date();
  }
}
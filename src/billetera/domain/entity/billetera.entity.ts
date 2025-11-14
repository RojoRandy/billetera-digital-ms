import { AggregateRoot } from "src/shared/domain/event/aggregate-root";
import { BilleteraId } from "../value-object/billetera-id.value-object";
import { DocumentoCliente } from "src/cliente/domain/value-object/documento-cliente.value-object";
import { CelularCliente } from "src/cliente/domain/value-object/celular-cliente.value-object";
import { CantidadBilletera } from "../value-object/cantidad-billetera.value-object";
import { BilleteraCreada } from "../event/billetera-creada.event";
import { SaldoRecargado } from "../event/saldo-recargado.event";
import { SaldoRestado } from "../event/saldo-restado.event";

export class Billetera extends AggregateRoot {
  
  private constructor(
    public id: BilleteraId,
    public documento: DocumentoCliente,
    public celular: CelularCliente,
    public cantidad: CantidadBilletera,
    public createdAt: Date,
    public updatedAt: Date,
  ){
    super()
  }

  public static create({
    documento,
    celular
  }: {
    documento: DocumentoCliente,
    celular: CelularCliente
  }): Billetera {
    const currentDate = new Date();
    const billetera = new this(
      BilleteraId.create(),
      documento,
      celular,
      CantidadBilletera.fromNumber(0),
      currentDate,
      currentDate
    );

    billetera.record(new BilleteraCreada(billetera));

    return billetera;
  }

  public recargarSaldo(cantidad: CantidadBilletera): void {
    const nuevoSaldo = this.cantidad.restar(cantidad)
    this.cantidad = nuevoSaldo;

    this.record(new SaldoRecargado(this, cantidad, nuevoSaldo))
  }

  public restarSaldo(cantidad: CantidadBilletera): void {
    const nuevoSaldo = this.cantidad.restar(cantidad)
    this.cantidad = nuevoSaldo;

    this.record(new SaldoRestado(this, cantidad, nuevoSaldo))
  }

  public static fromPrimitives({
    id,
    documento,
    celular,
    cantidad,
    createdAt,
    updatedAt
  }: {
    id: string,
    documento: string,
    celular: string,
    cantidad: number,
    createdAt: Date,
    updatedAt: Date,
  }): Billetera {
    return new this(
      BilleteraId.fromString(id),
      DocumentoCliente.fromString(documento),
      CelularCliente.fromString(celular),
      CantidadBilletera.fromNumber(cantidad),
      createdAt,
      updatedAt
    )
  }

  public toPrimitives(): BilleteraPrimitives {
    return {
      id: this.id.value,
      documento: this.documento.value,
      celular: this.celular.value,
      cantidad: this.cantidad.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}

export type BilleteraPrimitives = {
  id: string
  documento: string
  celular: string
  cantidad: number
  createdAt: Date
  updatedAt: Date
}
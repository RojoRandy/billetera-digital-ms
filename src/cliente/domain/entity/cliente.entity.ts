import { AggregateRoot } from "src/shared/domain/event/aggregate-root";
import { DocumentoCliente } from "../value-object/documento-cliente.value-object";
import { NombresCliente } from "../value-object/nombres-cliente.value-object";
import { EmailValueObject } from "src/shared/domain/value-object/email.value-object";
import { EmailCliente } from "../value-object/email-cliente.value-object";
import { CelularCliente } from "../value-object/celular-cliente.value-object";
import { ClienteId } from "../value-object/cliente-id.value-object";
import { ClienteCreado } from "../event/cliente-creado.event";

export class Cliente extends AggregateRoot {
  private constructor(
    public id: ClienteId,
    public documento: DocumentoCliente,
    public nombres: NombresCliente,
    public email: EmailCliente,
    public celular: CelularCliente,
    public createdAt: Date,
    public updatedAt: Date,
  ) {
    super();
  }

  public static create({
    documento,
    nombres,
    email,
    celular
  }: 
    {
      documento: DocumentoCliente, 
      nombres: NombresCliente, 
      email: EmailCliente, 
      celular: CelularCliente
  }): Cliente {
    const currentDate = new Date();
    const cliente = new this(
      ClienteId.create(),
      documento,
      nombres,
      email,
      celular,
      currentDate,
      currentDate
    );

    cliente.record(new ClienteCreado(cliente))

    return cliente;
  }

  public static fromPrimitives({
    id,
    documento,
    nombres,
    email,
    celular,
    createdAt,
    updatedAt
  }: {
    id: string,
    documento: string,
    nombres: string,
    email: string,
    celular: string,
    createdAt: Date,
    updatedAt: Date,
  }): Cliente {
    return new this(
      ClienteId.fromString(id),
      DocumentoCliente.fromString(documento),
      NombresCliente.fromString(nombres),
      EmailCliente.fromString(email),
      CelularCliente.fromString(celular),
      createdAt,
      updatedAt
    )
  }

  public toPrimitives(): ClientePrimitives {
    return {
      id: this.id.value,
      documento: this.documento.value,
      nombres: this.nombres.value,
      email: this.email.value,
      celular: this.celular.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}

export type ClientePrimitives = {
  id: string,
  documento: string,
  nombres: string,
  email: string,
  celular: string,
  createdAt: Date,
  updatedAt: Date,
}
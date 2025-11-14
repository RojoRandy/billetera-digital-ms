import { AggregateRoot } from "src/shared/domain/event/aggregate-root";
import { IdSesionCompra } from "../value-object/id-sesion-compra.value-object";
import { DocumentoCliente } from "src/cliente/domain/value-object/documento-cliente.value-object";
import { TotalCompra } from "../value-object/total-compra.value-object";
import { CompraCreada } from "../event/compra-creada.event";
import { TokenCompra } from "../value-object/token-compra.value-object";
import { EstadoCompra } from "../value-object/estado-compra.value-object";
import { CompraConfirmada } from "../event/compra-confirmada.event";
import { TokenCompraException } from "../exception/token-compra.exception";


export class Compra extends AggregateRoot {
  private constructor(
    public idSesion: IdSesionCompra,
    public documento: DocumentoCliente,
    public total: TotalCompra,
    public token: TokenCompra,
    public estado: EstadoCompra,
    public createdAt: Date,
    public updatedAt: Date,
  ){
    super()
  }

  public static create({
    documento,
    total
  }:{
    documento: DocumentoCliente,
    total: TotalCompra
  }): Compra {
    const currentDate = new Date();

    const compra = new this(
      IdSesionCompra.create(),
      documento,
      total,
      TokenCompra.create(),
      EstadoCompra.pendiente(),
      currentDate,
      currentDate
    )

    compra.record(new CompraCreada(compra))

    return compra;
  }

  public obtenerToken(): string {
    return this.token.value;
  }

  public confirmarCompra(token: TokenCompra) {
    if (!this.token.equals(token)) {
      throw TokenCompraException.tokenDoesNotMatches()
    }
    
    const estadoAnterior = this.estado;
    this.estado = EstadoCompra.confirmado();

    this.record(new CompraConfirmada(this, estadoAnterior, this.estado))
  }

  public obtenerTotal(): number {
    return this.total.value;
  }

  public static fromPrimitives({
    idSesion,
    documento,
    total,
    token,
    estado,
    createdAt,
    updatedAt
  }: {
    idSesion: string
    documento: string
    total: number
    token: string
    estado: string
    createdAt: Date
    updatedAt: Date
  }): Compra {
    return new this(
      IdSesionCompra.fromString(idSesion),
      DocumentoCliente.fromString(documento),
      TotalCompra.fromNumber(total),
      TokenCompra.fromString(token),
      EstadoCompra.fromString(estado),
      createdAt,
      updatedAt
    )
  }

  public toPrimitives(): CompraPrimitives {
    return {
      idSesion: this.idSesion.value,
      documento: this.documento.value,
      total: this.total.value,
      token: this.token.value,
      estado: this.estado.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}

export type CompraPrimitives = {
  idSesion: string
  documento: string
  total: number
  token: string
  estado: string
  createdAt: Date
  updatedAt: Date
}
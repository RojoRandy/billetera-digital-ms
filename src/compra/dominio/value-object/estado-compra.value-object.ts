import { EstadoCompraException } from "../exception/estado-compra.exception"

export enum EstadoCompraEnum {
  PENDIENTE = 'PENDIENTE',
  CONFIRMADO = 'CONFIRMADO'
}

export class EstadoCompra {
  public constructor(public readonly value: EstadoCompraEnum) {
    this.isValid()
  }

  public static pendiente(): EstadoCompra {
    return new EstadoCompra(EstadoCompraEnum.PENDIENTE)
  }

  public static confirmado(): EstadoCompra {
    return new EstadoCompra(EstadoCompraEnum.CONFIRMADO)
  }

  public static fromString(estado: string): EstadoCompra {
    const estadoEnum = EstadoCompraEnum[estado]
    return new EstadoCompra(estadoEnum)
  }

  public esPendiente(): boolean {
    return this.value === EstadoCompraEnum.PENDIENTE
  }

  public esConfirmado(): boolean {
    return this.value === EstadoCompraEnum.CONFIRMADO
  }

  public equals(otro: EstadoCompra): boolean {
    return otro.value === this.value;
  }

  private isValid() {
    if (!Object.values(EstadoCompraEnum).includes(this.value)) 
      throw EstadoCompraException.invalid()
  }
}
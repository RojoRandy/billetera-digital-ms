import { Cliente } from "src/cliente/domain/entity/cliente.entity"

export class ClientePresentation {
  private constructor(private readonly cliente: Cliente) {}

  public static fromCliente(cliente: Cliente): ClientePresentation {
    return new this(cliente)
  }

  public format(): ClienteResponse {
    const { documento, celular, nombres  } = this.cliente.toPrimitives()

    return {
      documento,
      celular,
      nombres
    }
  }
}

export type ClienteResponse = {
  documento: string
  celular: string
  nombres: string
}
import { Compra } from "src/compra/dominio/entity/compra.entity";


export class CompraPresentation {
  private constructor(private readonly compra: Compra){}

  public static fromCompra(compra: Compra): CompraPresentation {
    return new this(compra)
  }

  public format(): CompraResponse {
    const { idSesion } = this.compra.toPrimitives()

    return {
      idSesion
    }
  }
}

export type CompraResponse = {
  idSesion: string
}
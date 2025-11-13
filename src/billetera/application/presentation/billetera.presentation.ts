import { Billetera } from "src/billetera/domain/entity/billetera.entity";

export class BilleteraPresentation {
  private constructor(private readonly billetera: Billetera) {}

  public static fromBilletera(billetera: Billetera): BilleteraPresentation {
    return new this(billetera)
  }

  public format(): BilleteraResponse {
    const {documento, celular, cantidad, createdAt} = this.billetera.toPrimitives()

    return {
      documento,
      celular,
      cantidad,
      createdAt
    }
  }
}

export type BilleteraResponse = {
  documento: string
  celular: string
  cantidad: number
  createdAt: Date
}
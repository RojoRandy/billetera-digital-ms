import { NumberValueObject } from "src/shared/domain/value-object/number.value-object";
import { TotalCompraException } from "../exception/total-compra.exception";

export class TotalCompra extends NumberValueObject {
  public constructor(private readonly total: number) {
    super(total);
    this.isValid()
  }

  public static fromNumber(cantidad: number): TotalCompra {
    return new this(cantidad);
  }

  private isValid(): void {
    if (this.total < 0) throw TotalCompraException.nonNegativeAllowed();
  }
}
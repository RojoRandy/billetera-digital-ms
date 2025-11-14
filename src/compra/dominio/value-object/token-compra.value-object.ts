import { ValueObject } from "src/shared/domain/value-object/value-object";
import { TokenCompraException } from "../exception/token-compra.exception";

export class TokenCompra extends ValueObject<string> {
  private constructor(token: string) {
    super(token)
    this.isValid(token)
  }

  public static create(): TokenCompra {
    const token = Math
      .floor(Math.random() * 900000)
      .toString()
      .padStart(6, '0');
    return new this(token)
  }

  public static fromString(value: string): TokenCompra {
    return new this(value);
  }

  private isValid(value: string): void {
    const num = Number(value)
    if (value.length !== 6 || 
      isNaN(num)
    ) throw TokenCompraException.invalidToken()
  }
}
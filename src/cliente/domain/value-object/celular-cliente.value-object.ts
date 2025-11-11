import { StringValueObject } from "src/shared/domain/value-object/string.value-object";
import { CelularClienteException } from "../exception/celular-cliente.exception";

export class CelularCliente extends StringValueObject {
  private celularRegex: RegExp = /^\d{10}$/;
  

  public constructor(private readonly celular: string) {
    super(celular);
  }

  public static fromString(celular: string): CelularCliente {
    return new this(celular)
  }

  private isValid(): void {
    if (!new RegExp(this.celularRegex).test(this.celular)) throw CelularClienteException.invalid();
  }
}
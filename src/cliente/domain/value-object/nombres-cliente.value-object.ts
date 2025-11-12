import { StringValueObject } from "src/shared/domain/value-object/string.value-object";
import { NombresClienteException } from "../exception/nombres-cliente.exception";


export class NombresCliente extends StringValueObject {
  public constructor(private readonly nombres: string) {
    super(nombres);
    this.isValid();
  }

  public static fromString(nombres: string): NombresCliente {
    return new this(nombres)
  }

  private isValid(): void {
    if (this.nombres.length < 3) throw NombresClienteException.tooShort();
    if (this.nombres.length > 50) throw NombresClienteException.tooLong();
  }
}